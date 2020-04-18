import { Op } from 'sequelize';
import * as Yup from 'yup';

import { parseISO, getHours } from 'date-fns';

import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliveryController {
  async showOpen(req, res) {
    const { id } = req.params;

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
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
      ],
      order: ['createdAt'],
    });

    return res.json(deliveries);
  }

  async showClosed(req, res) {
    const { id } = req.params;

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
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
      ],
      order: ['createdAt'],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { delivery_id, id } = req.params;

    const deliveries = await Order.findAll({
      where: {
        id,
      },
    });

    if (deliveries.length > 5) {
      return res
        .status(400)
        .json({ error: 'You are only allowed to take 5 deliveries per day' });
    }

    const delivery = await Order.findByPk(delivery_id);
    const sDate = parseISO(
      req.body.start_date ? req.body.start_date : delivery.start_date
    );
    const eDate = parseISO(req.body.end_date);

    if (!delivery.start_date && !req.body.start_date && req.body.end_date) {
      return res.status(400).json({ error: 'Do not have start date' });
    }

    if (getHours(sDate) < 8 || getHours(sDate) > 18) {
      return res
        .status(400)
        .json({ error: 'Out of time to pick up the order' });
    }

    if (getHours(eDate) < 8 || getHours(eDate) > 18) {
      return res
        .status(400)
        .json({ error: 'Out of time to delivery the order' });
    }

    if (req.body.end_date && !req.body.signature_id) {
      return res
        .status(400)
        .json({ error: 'You must have a signature to close delivery' });
    }

    const {
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    } = await delivery.update(req.body);

    return res.json({
      delivery_id,
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    });
  }
}

export default new DeliveryController();
