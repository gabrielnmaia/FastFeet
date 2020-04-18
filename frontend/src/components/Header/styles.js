import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  height: 64px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      width: 135px;
      height: 26px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  strong {
    display: block;
    color: #333;
    font-size: 14 px;
  }

  button {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    color: #de3b3b;
    background: none;
    border: 0;
    font-weight: 14px;
  }
`;

export const Links = styled(Link)`
  font-weight: bold;
  margin-right: 15px;

  span {
    color: ${props => (props.isSelected ? '#444444' : '#999999')};
  }
`;
