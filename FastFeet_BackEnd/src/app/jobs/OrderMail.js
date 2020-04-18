import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { order } = data;

    console.log('a fila andou order');

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'order',
      context: {
        deliveryman: order.deliveryman.name,
        recipient: order.recipient.name,
        address_name: order.recipient.address_name,
        address_number: order.recipient.address_number,
        address_complement: order.recipient.address_complement,
        address_cep: order.recipient.address_cep,
        address_city: order.recipient.address_city,
        address_state: order.recipient.address_state,
      },
    });
  }
}

export default new OrderMail();
