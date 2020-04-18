import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const name = `${req.query.name}%`;
    const { page } = req.query;

    if (page > 0) {
      const order = await Recipient.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
        limit: 10,
        offset: (page - 1) * 10,
        order: [['createdAt', 'DESC']],
      });
      return res.json(order);
    }
    const order = await Recipient.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
      order: [['name', 'ASC']],
    });
    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_name: Yup.string().required(),
      address_number: Yup.string().required(),
      address_complement: Yup.string(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
      address_cep: Yup.string()
        .length(9)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      address_name,
      address_number,
      address_complement,
      address_state,
      address_city,
      address_cep,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      address_name,
      address_number,
      address_complement,
      address_state,
      address_city,
      address_cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address_name: Yup.string(),
      address_number: Yup.string(),
      address_complement: Yup.string(),
      address_state: Yup.string(),
      address_city: Yup.string(),
      address_cep: Yup.string().length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    const {
      name,
      address_name,
      address_number,
      address_complement,
      address_state,
      address_city,
      address_cep,
    } = await recipient.update(req.body);

    return res.json({
      name,
      address_name,
      address_number,
      address_complement,
      address_state,
      address_city,
      address_cep,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Recipient.findByPk(id);

    deliveryman.destroy();

    return res.json({ message: 'Removed' });
  }
}

export default new RecipientController();
