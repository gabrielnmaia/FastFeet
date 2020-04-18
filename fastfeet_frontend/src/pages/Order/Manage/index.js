import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import Select from '~/components/Select';
import {
  back,
  createRequest,
  updateRequest,
} from '~/store/modules/order/actions';
import api from '~/services/api';

import { Container, Title, FormPanel } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('O produto é obrigatório'),
});

export default function Manage() {
  const orderRedux = useSelector(state => state.order.order);
  const [order, setorder] = useState(orderRedux);
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliverymen() {
      const res = await api.get('deliverymen', {
        params: {
          name: '',
          page: 0,
        },
      });
      const data = [];
      res.data.rows.map(item =>
        data.push({ value: item.id, label: item.name })
      );

      setDeliverymen(data);
    }

    async function loadRecipient() {
      const res = await api.get('recipients', {
        params: {
          name: '',
          page: 0,
        },
      });
      const data = [];
      res.data.rows.map(item =>
        data.push({ value: item.id, label: item.name })
      );

      setRecipients(data);
    }
    loadDeliverymen();
    loadRecipient();

    async function loadData() {
      await formRef.current.getData();

      await formRef.current.setFieldValue('recipient', {
        value: orderRedux.recipient_id,
        label: orderRedux.recipient.name,
      });
      await formRef.current.setFieldValue('deliveryman', {
        value: orderRedux.deliveryman_id,
        label: orderRedux.deliveryman.name,
      });
    }

    if (orderRedux) {
      console.tron.log(orderRedux);
      loadData();
    }
  }, [orderRedux]);

  async function handleSubmit(data) {
    console.tron.log(data);
    try {
      formRef.current.setErrors({});
      await schema.validate(data, { abortEarly: false });

      if (orderRedux) {
        dispatch(
          updateRequest({
            id: order.id,
            product: data.product,
            recipient_id: data.recipient,
            deliveryman_id: data.deliveryman,
          })
        );
      } else {
        dispatch(
          createRequest({
            product: data.product,
            recipient_id: data.recipient,
            deliveryman_id: data.deliveryman,
          })
        );
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  function handleBack() {
    dispatch(back());
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        schema={schema}
        ref={formRef}
        initialData={order}
      >
        <Title>
          {orderRedux ? (
            <h1>Edição de encomendas</h1>
          ) : (
            <h1>Cadastro de encomendas</h1>
          )}
          <div>
            <button className="back" type="button" onClick={handleBack}>
              <MdChevronLeft size={24} color="#fff" />
              Voltar
            </button>
            <button className="save" type="submit">
              <MdDone size={24} color="#fff" />
              Salvar
            </button>
          </div>
        </Title>
        <FormPanel>
          <div className="select-group">
            <div className="select">
              <Select
                id="recipient"
                name="recipient"
                options={recipients}
                label="Destinatário"
                placeholder="Destinatário"
              />
            </div>
            <div className="select">
              <Select
                id="deliveryman"
                name="deliveryman"
                options={deliverymen}
                label="Entregador"
                placeholder="Entregador"
              />
            </div>
          </div>
          <Input
            id="product"
            name="product"
            placeholder="Digite o nome do produto"
            label="Nome do produto"
          />
        </FormPanel>
      </Form>
    </Container>
  );
}
