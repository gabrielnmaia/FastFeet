import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import {
  MdAdd,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { update, create } from '~/store/modules/order/actions';
import Input from '~/components/Input';
import api from '~/services/api';
import ActionsMenu from '~/components/ActionsMenu';

import {
  Container,
  Utils,
  Table,
  TableHead,
  TableRow,
  Id,
  Recipient,
  Deliveryman,
  City,
  State,
  Status,
  Action,
  Pages,
  Next,
  Previous,
  Modal,
  ModalRecipient,
  ModalDates,
} from './styles';

const status_map = {
  CANCELADA: '#fab0b0',
  ENTREGUE: '#DFF0DF',
  RETIRADA: '#BAD2FF',
  PENDENTE: '#F0F0DF',
};

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [product, setProduct] = useState('');
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  function calculateStatus(order) {
    if (order.canceled_at !== null) {
      return 'CANCELADA';
    }
    if (order.end_date !== null) {
      return 'ENTREGUE';
    }
    if (order.start_date !== null) {
      return 'RETIRADA';
    }
    return 'PENDENTE';
  }

  async function onClickVisualize(order) {
    await setSelectedOrder(orders.find(e => e.id === order.id));
    setShowModal(!showModal);
  }

  const onClickDelete = useCallback(async order => {
    if (window.confirm('Você deseja mesmo excluir essa encomenda?')) {
      await api.delete(`orders/${order.id}`);
      setRefresh(true);
    }
  }, []);

  function handleEdit(order) {
    dispatch(update(order));
  }

  function handleCreate() {
    dispatch(create());
  }

  const actions = [
    {
      label: 'Visualizar',
      icon: MdRemoveRedEye,
      onClick: onClickVisualize,
      color: '#8E5BE8',
    },
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
    async function loadOrders() {
      const res = await api.get('orders', {
        params: {
          product,
          page,
        },
      });

      const { rows, count } = res.data;

      const data = rows.map(order => ({
        ...order,
        status: calculateStatus(order),
      }));
      setOrders(data);
      setCountPage(count);
    }
    loadOrders();
    setRefresh(false);
  }, [page, product, refresh]);

  function handleSubmit({ search }) {
    setProduct(search);
    setPage(1);
  }

  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNext() {
    if ((page - 1) * 10 + orders.length === countPage) return;
    setPage(page + 1);
  }

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <Utils>
        <Form onSubmit={handleSubmit}>
          <Input
            id="search"
            name="search"
            placeholder="Buscar por encomendas"
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
          <Recipient>Destinatário</Recipient>
          <Deliveryman>Entregador</Deliveryman>
          <City>Cidade</City>
          <State>Estado</State>
          <Status>Status</Status>
          <Action>Ações</Action>
        </TableHead>
        {orders.map(order => (
          <TableRow key={order.id}>
            <Id>{order.id}</Id>
            <Recipient>{order.recipient.name}</Recipient>
            <Deliveryman>
              <img
                src={
                  order.deliveryman.file
                    ? order.deliveryman.file.url
                    : `https://api.adorable.io/avatars/50/${order.deliveryman.name}.png`
                }
                alt={order.deliveryman.name}
              />
              {order.deliveryman.name}
            </Deliveryman>
            <City>{order.recipient.address_city}</City>
            <State>{order.recipient.address_state}</State>
            <Status status={status_map[order.status]}>
              <span>{order.status}</span>
            </Status>
            <Action>
              <ActionsMenu actions={actions} generic={order} />
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
          <Next active={(page - 1) * 10 + orders.length !== countPage} />
        </button>
      </Pages>
      <div className="modal" showModal={showModal}>
        <Modal showModal={showModal}>
          {selectedOrder ? (
            <>
              <ModalRecipient>
                <strong>Informações da encomenda</strong>
                <span>
                  {selectedOrder.recipient.address_name},{' '}
                  {selectedOrder.recipient.address_number}
                </span>
                <span>
                  {selectedOrder.recipient.address_city} -{' '}
                  {selectedOrder.recipient.address_state}
                </span>
                <span>{selectedOrder.recipient.address_cep}</span>
              </ModalRecipient>
              <ModalDates>
                <strong>Datas</strong>
                <span>
                  Retirada:{' '}
                  {selectedOrder.start_date &&
                    format(parseISO(selectedOrder.start_date), 'dd/MM/yyyy', {
                      locale: pt,
                    })}
                </span>
                <span>
                  Entrega:{' '}
                  {selectedOrder.end_date &&
                    format(parseISO(selectedOrder.end_date), 'dd/MM/yyyy', {
                      locale: pt,
                    })}
                </span>
              </ModalDates>
              <div className="signature">
                <span>Assinatura do destinatário</span>
                {selectedOrder.signature_id ? (
                  <img
                    src={selectedOrder.file.url}
                    alt={selectedOrder.signature_id}
                  />
                ) : (
                  <span>Sem assinatura disponível</span>
                )}
              </div>
            </>
          ) : (
            ''
          )}
          <div />
          <button type="button" onClick={onClickVisualize}>
            Voltar
          </button>
        </Modal>
      </div>
    </Container>
  );
}
