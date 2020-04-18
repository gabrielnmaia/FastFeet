import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Background from '~/components/Background';

import {
  PurpleBackground,
  Container,
  Title,
  ProblemsList,
  Problem,
} from './styles';

export default function ListProblem() {
  const delivery = useSelector((state) => state.delivery.delivery);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const res = await api.get(`delivery/${delivery.id}/problems`);

      setProblems(res.data);
    }

    loadProblems();
  }, []);

  return (
    <>
      <PurpleBackground />
      <Background>
        <Container>
          <Title>{`Pedido ${delivery.id}`}</Title>
          {problems.length > 0 ? (
            <ProblemsList
              data={problems}
              ketExtractor={(problem) => String(problem.id)}
              renderItem={({ item: problem }) => (
                <Problem>
                  <Text
                    style={{ maxWidth: '75%', color: '#999999', fontSize: 16 }}
                  >
                    {problem.description}
                  </Text>
                  <Text style={{ color: '#C1C1C1', fontSize: 12 }}>
                    {format(parseISO(problem.createdAt), 'dd/MM/yyyy', {
                      locale: pt,
                    })}
                  </Text>
                </Problem>
              )}
            />
          ) : (
            <Title style={{ marginTop: 20, fontSize: 20 }}>
              Pedido sem problemas
            </Title>
          )}
        </Container>
      </Background>
    </>
  );
}
