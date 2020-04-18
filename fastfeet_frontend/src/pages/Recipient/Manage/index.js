import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import {
  back,
  createRequest,
  updateRequest,
} from '~/store/modules/recipient/actions';

import { Container, Title, FormPanel } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  address_name: Yup.string().required('A rua é obrigatória'),
  address_number: Yup.number().required('O número é obrigatório'),
  address_state: Yup.string().required('O estado é obrigatório'),
  address_city: Yup.string().required('A cidade é obrigatória'),
  address_cep: Yup.string().required('O cep é obrigatório'),
});

export default function Manage() {
  const recipientRedux = useSelector(state => state.recipient.recipient);
  const [recipient, setRecipient] = useState(recipientRedux);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, { abortEarly: false });

      if (recipientRedux) {
        dispatch(
          updateRequest({
            id: recipientRedux.id,
            name: data.name,
            address_name: data.address_name,
            address_number: data.address_number.toString(),
            address_complement: data.address_complement,
            address_state: data.address_state,
            address_city: data.address_city,
            address_cep: data.address_cep,
          })
        );
      } else {
        dispatch(
          createRequest({
            name: data.name,
            address_name: data.address_name,
            address_number: data.address_number.toString(),
            address_complement: data.address_complement,
            address_state: data.address_state,
            address_city: data.address_city,
            address_cep: data.address_cep,
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
        initialData={recipient}
      >
        <Title>
          {recipientRedux ? (
            <h1>Edição de destinatário</h1>
          ) : (
            <h1>Cadastro de destinatário</h1>
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
          <Input
            id="name"
            name="name"
            placeholder="Nome do destinatário"
            label="Nome"
            className="name"
          />
          <div className="address">
            <div className="add">
              <Input
                id="address_name"
                name="address_name"
                placeholder="Rua do destinatário"
                label="Rua"
              />
            </div>
            <div className="add">
              <Input
                id="address_number"
                type="number"
                name="address_number"
                placeholder="Número da casa"
                label="Número do destinatário"
              />
            </div>
            <div className="add">
              <Input
                id="address_complement"
                name="address_complement"
                label="Complemento"
                placeholder="Complemento do endereço"
              />
            </div>
          </div>
          <div className="address">
            <div className="add">
              <Input
                id="address_city"
                name="address_city"
                placeholder="Cidade do destinatário"
                label="Cidade"
              />
            </div>
            <div className="add">
              <Input
                id="address_state"
                name="address_state"
                placeholder="Estado do destinatário"
                label="Estado"
              />
            </div>
            <div className="add">
              <InputMask
                id="address_cep"
                name="address_cep"
                placeholder="CEP do destinatário"
                label="CEP"
                mask="99999-999"
              />
            </div>
          </div>
        </FormPanel>
      </Form>
    </Container>
  );
}
