import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblem.findAndCountAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['createdAt', 'DESC']],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.id,
      },
      order: [['createdAt', 'DESC']],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { description } = req.body;
    const { id } = req.params;

    const problem = await DeliveryProblem.create({
      description,
      delivery_id: id,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    const delivery = await Order.findByPk(problem.delivery_id);

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already cancelled' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);
    const recipient = await Recipient.findByPk(delivery.recipient_id);

    await Queue.add(CancellationMail.key, {
      order: {
        deliveryman,
        recipient,
      },
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
