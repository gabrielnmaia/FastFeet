import React, { useState } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { problemRequest } from '~/store/modules/delivery/actions';
import Background from '~/components/Background';

import { PurpleBackground, Container, Form, SubmitButton } from './styles';

export default function ReportProblem({ navigation }) {
  const delivery = useSelector((state) => state.delivery.delivery);
  const dispatch = useDispatch();
  const [problem, setProblem] = useState('');

  function handleSubmit() {
    dispatch(problemRequest(delivery.id, problem, navigation));
  }

  return (
    <>
      <PurpleBackground />
      <Background>
        <Container>
          <Form
            multiline
            numberOfLines={20}
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            value={problem}
            onChangeText={setProblem}
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enviar</Text>
          </SubmitButton>
        </Container>
      </Background>
    </>
  );
}
