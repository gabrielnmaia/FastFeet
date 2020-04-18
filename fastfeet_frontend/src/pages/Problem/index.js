import React, { useEffect, useState, useCallback } from 'react';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import api from '~/services/api';
import ActionsMenu from '~/components/ActionsMenu';

import {
  Container,
  Modal,
  Table,
  TableHead,
  TableRow,
  Order,
  ProblemDescription,
  Action,
  Pages,
  Next,
  Previous,
} from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const onClickDelete = useCallback(async problem => {
    if (window.confirm('Você deseja mesmo cancelar esse pedido?')) {
      await api.delete(`problems/${problem.id}`);
      setRefresh(true);
    }
  }, []);

  async function onClickVisualize(problem) {
    await setSelectedProblem(problems.find(e => e.id === problem.id));
    setShowModal(!showModal);
  }

  const actions = [
    {
      label: 'Visualizar',
      onClick: onClickVisualize,
      icon: MdCreate,
      color: '#4D85EE',
    },
    {
      label: 'Cancelar',
      onClick: onClickDelete,
      icon: MdDeleteForever,
      color: '#DE3B3B',
    },
  ];

  useEffect(() => {
    async function loadProblems() {
      const res = await api.get('problems', {
        params: {
          page,
        },
      });

      const { rows, count } = res.data;

      setProblems(rows);
      setCountPage(count);
    }
    loadProblems();
    setRefresh(false);
  }, [page, refresh]);

  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNext() {
    if ((page - 1) * 10 + problems.length === countPage) return;
    setPage(page + 1);
  }

  return (
    <Container>
      <h1>Problemas na entrega</h1>
      <Table>
        <TableHead>
          <Order>Pedido</Order>
          <ProblemDescription>Problema</ProblemDescription>
          <Action>Ações</Action>
        </TableHead>
        {problems.map(problem => (
          <TableRow key={problem.id}>
            <Order>{problem.delivery_id}</Order>
            <ProblemDescription>{problem.description}</ProblemDescription>
            <Action>
              <ActionsMenu actions={actions} generic={problem} />
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
          <Next active={(page - 1) * 10 + problems.length !== countPage} />
        </button>
      </Pages>
      <div className="modal" showModal={showModal}>
        <Modal showModal={showModal}>
          <span className="title">Visualizar problema</span>
          <span>{selectedProblem ? selectedProblem.description : ''}</span>
          <button type="button" onClick={onClickVisualize}>
            Voltar
          </button>
        </Modal>
      </div>
    </Container>
  );
}
