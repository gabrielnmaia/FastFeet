import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const name = `${req.query.name}%`;
    const { page } = req.query;

    if (page > 0) {
      const deliverymen = await Deliveryman.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: File,
            as: 'file',
            attributes: ['url', 'path'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      return res.json(deliverymen);
    }
    const deliverymen = await Deliveryman.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['url', 'path'],
        },
      ],
      order: [['name', 'ASC']],
    });
    return res.json(deliverymen);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Deliveryman.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['url', 'path'],
        },
      ],
    });

    if (!userExists) {
      return res.status(401).json({ error: 'Delivery man not exists' });
    }

    return res.json(userExists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Delivery man already exists' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (email && email !== deliveryman.email) {
      const userExists = await Deliveryman.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Delivery man already exists' });
      }
    }

    const { name } = await deliveryman.update(req.body);

    return res.json({ id, name });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    deliveryman.destroy();

    return res.json({ message: 'Removed' });
  }
}

export default new DeliverymanController();
