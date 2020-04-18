import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo-white.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          value={id}
          onChangeText={setId}
          onSubmitEditing={handleSubmit}
          keyboardType="numbers-and-punctuation"
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
