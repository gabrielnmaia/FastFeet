import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile, Links } from './styles';

const links = [
  {
    label: 'ENCOMENDAS',
    link: 'order',
  },
  {
    label: 'ENTREGADORES',
    link: 'deliverymen',
  },
  {
    label: 'DESTINATÁRIOS',
    link: 'recipient',
  },
  {
    label: 'PROBLEMAS',
    link: 'problem',
  },
];

export default function Header() {
  const location = useLocation().pathname.split('/');
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          {links.map(item => (
            <Links
              key={item.link}
              to={`/${item.link}`}
              isSelected={item.link === location[1]}
            >
              <span>{item.label}</span>
            </Links>
          ))}
        </nav>

        <aside>
          <Profile>
            <strong>Admin FastFeet</strong>
            <button type="button" onClick={handleSignOut}>
              Sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
