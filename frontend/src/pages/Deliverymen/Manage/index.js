import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import FileInput from '~/components/FileInput';
import {
  back,
  createRequest,
  updateRequest,
} from '~/store/modules/deliveryman/actions';

import { Container, Title, FormPanel } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
});

export default function Manage() {
  const deliverymanRedux = useSelector(state => state.deliveryman.deliveryman);
  const [deliveryman, setDeliveryman] = useState(deliverymanRedux);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, { abortEarly: false });

      if (deliverymanRedux) {
        dispatch(
          updateRequest({
            id: deliveryman.id,
            name: data.name,
            email: data.email,
            avatar_id:
              data.file.url === null ? deliveryman.avatar_id : data.file.url,
          })
        );
      } else {
        dispatch(
          createRequest({
            name: data.name,
            email: data.email,
            avatar_id: data.file.url,
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
        initialData={deliveryman}
      >
        <Title>
          {deliverymanRedux ? (
            <h1>Edição de entregadores</h1>
          ) : (
            <h1>Cadastro de entregadores</h1>
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
          <FileInput name="file.url" />
          <Input
            id="name"
            name="name"
            placeholder="Digite seu nome"
            label="Nome"
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            label="Email"
          />
        </FormPanel>
      </Form>
    </Container>
  );
}
