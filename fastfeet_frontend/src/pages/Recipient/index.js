import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { MdAdd, MdCreate, MdDeleteForever } from 'react-icons/md';
import Input from '~/components/Input';
import api from '~/services/api';
import ActionsMenu from '~/components/ActionsMenu';
import { update, create } from '~/store/modules/recipient/actions';

import {
  Container,
  Utils,
  Table,
  TableHead,
  TableRow,
  Id,
  RecipientName,
  Address,
  Action,
  Pages,
  Next,
  Previous,
} from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const onClickDelete = useCallback(async recipient => {
    if (window.confirm('Você deseja mesmo excluir esse destinatário?')) {
      await api.delete(`recipients/${recipient.id}`);
      setRefresh(true);
    }
  }, []);

  function handleEdit(recipient) {
    dispatch(update(recipient));
  }

  function handleCreate() {
    dispatch(create());
  }

  const actions = [
    {
      label: 'Editar',
      onClick: handleEdit,
      icon: MdCreate,
      color: '#4D85EE',
    },
    {
      label: 'Excluir',
      onClick: onClickDelete,
      icon: MdDeleteForever,
      color: '#DE3B3B',
    },
  ];

  useEffect(() => {
    async function loadRecipients() {
      const res = await api.get('recipients', {
        params: {
          name,
          page,
        },
      });

      const { rows, count } = res.data;

      setRecipients(rows);
      setCountPage(count);
    }
    loadRecipients();
    setRefresh(false);
  }, [name, page, refresh]);

  function handleSubmit({ search }) {
    setName(search);
  }

  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNext() {
    if ((page - 1) * 10 + recipients.length === countPage) return;
    setPage(page + 1);
  }

  return (
    <Container>
      <h1>Gerenciando destinatários</h1>
      <Utils>
        <Form onSubmit={handleSubmit}>
          <Input
            id="search"
            name="search"
            placeholder="Buscar por destinatários"
          />
        </Form>
        <button type="button" onClick={handleCreate}>
          <MdAdd size={32} color="#fff" />
          CADASTRAR
        </button>
      </Utils>
      <Table>
        <TableHead>
          <Id>ID</Id>
          <RecipientName>Nome</RecipientName>
          <Address>Endereço</Address>
          <Action>Ações</Action>
        </TableHead>
        {recipients.map(recipient => (
          <TableRow key={recipient.id}>
            <Id>{recipient.id}</Id>
            <RecipientName>{recipient.name}</RecipientName>
            <Address>{`${recipient.address_name}, ${recipient.address_number}, ${recipient.address_city} - ${recipient.address_state}`}</Address>
            <Action>
              <ActionsMenu actions={actions} generic={recipient} />
            </Action>
          </TableRow>
        ))}
      </Table>
      <Pages>
        <button type="button" onClick={handlePrev}>
          <Previous active={page !== 1} />
        </button>
        <strong>Página {page}</strong>
        <button type="button" onClick={handleNext}>
          <Next active={(page - 1) * 10 + recipients.length !== countPage} />
        </button>
      </Pages>
    </Container>
  );
}
