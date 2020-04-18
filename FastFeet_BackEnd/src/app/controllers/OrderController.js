import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, getHours, isBefore } from 'date-fns';

import OrderMail from '../jobs/OrderMail';
import Queue from '../../lib/Queue';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class OrderController {
  async index(req, res) {
    const product = `${req.query.product}%`;
    const { page = 1 } = req.query;

    const orders = await Order.findAndCountAll({
      where: {
        product: {
          [Op.iLike]: product,
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address_city',
            'address_state',
            'address_name',
            'address_number',
            'address_cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: File,
          as: 'file',
          attributes: ['url', 'path'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json(orders);
  }

  async show(req, res) {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address_city',
            'address_state',
            'address_name',
            'address_number',
            'address_cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['url', 'path'],
            },
          ],
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const order = await Order.create(req.body);

      const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
      const recipient = await Recipient.findByPk(req.body.recipient_id);

      await Queue.add(OrderMail.key, {
        order: {
          deliveryman,
          recipient,
        },
      });

      return res.json(order);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    const sDate = parseISO(req.body.start_date);
    const eDate = parseISO(req.body.end_date);

    if (isBefore(sDate, new Date()) || isBefore(eDate, new Date())) {
      return res.status(400).json({ error: 'Date in past' });
    }

    if (getHours(sDate) < 8 || getHours(sDate) > 18) {
      return res
        .status(400)
        .json({ error: 'Out of time to pick up the order' });
    }

    if ((!order.start_date || !req.body.start_date) && req.body.end_date) {
      return res.status(400).json({ error: 'Do not have start date' });
    }

    const {
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    } = await order.update(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    order.destroy();

    return res.json({ message: 'Removed' });
  }
}

export default new OrderController();
