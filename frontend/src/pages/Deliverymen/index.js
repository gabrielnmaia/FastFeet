import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { MdAdd, MdCreate, MdDeleteForever } from 'react-icons/md';
import Input from '~/components/Input';
import api from '~/services/api';
import ActionsMenu from '~/components/ActionsMenu';
import { update, create } from '~/store/modules/deliveryman/actions';

import {
  Container,
  Utils,
  Table,
  TableHead,
  TableRow,
  Id,
  Photo,
  Deliveryman,
  Email,
  Action,
  Pages,
  Next,
  Previous,
} from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const onClickDelete = useCallback(async deliveryman => {
    if (window.confirm('Você deseja mesmo excluir esse entregador?')) {
      await api.delete(`deliverymen/${deliveryman.id}`);
      setRefresh(true);
    }
  }, []);

  function handleEdit(deliveryman) {
    dispatch(update(deliveryman));
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
    async function loadDeliverymen() {
      const res = await api.get('deliverymen', {
        params: {
          name,
          page,
        },
      });

      const { rows, count } = res.data;

      setDeliverymen(rows);
      setCountPage(count);
    }
    loadDeliverymen();
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
    if ((page - 1) * 10 + deliverymen.length === countPage) return;
    setPage(page + 1);
  }

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <Utils>
        <Form onSubmit={handleSubmit}>
          <Input
            id="search"
            name="search"
            placeholder="Buscar por entregadores"
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
          <Photo>Foto</Photo>
          <Deliveryman>Nome</Deliveryman>
          <Email>Email</Email>
          <Action>Ações</Action>
        </TableHead>
        {deliverymen.map(deliveryman => (
          <TableRow key={deliveryman.id}>
            <Id>{deliveryman.id}</Id>
            <Photo>
              <img
                src={
                  deliveryman.file
                    ? deliveryman.file.url
                    : `https://api.adorable.io/avatars/50/${deliveryman.name}.png`
                }
                alt={deliveryman.name}
              />
            </Photo>
            <Deliveryman>{deliveryman.name}</Deliveryman>
            <Email>{deliveryman.email}</Email>
            <Action>
              <ActionsMenu actions={actions} generic={deliveryman} />
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
          <Next active={(page - 1) * 10 + deliverymen.length !== countPage} />
        </button>
      </Pages>
    </Container>
  );
}
