import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { signOut } from '~/store/modules/auth/actions';
import Background from '~/components/Background';

import { Container, Avatar, Label, Description, SubmitButton } from './styles';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <View>
          <Avatar
            source={{
              uri: user.file
                ? user.file.url
                : `https://api.adorable.io/avatars/50/${user.name}.png`,
            }}
          />
        </View>
        <Label>Nome completo</Label>
        <Description>{user.name}</Description>
        <Label>Email</Label>
        <Description>{user.email}</Description>
        <Label>Data de cadastro</Label>
        <Description>
          {format(parseISO(user.createdAt), 'dd/MM/yyyy', {
            locale: pt,
          })}
        </Description>
        <SubmitButton loading={loading} onPress={handleLogout}>
          Logout
        </SubmitButton>
      </Container>
    </Background>
  );
}
