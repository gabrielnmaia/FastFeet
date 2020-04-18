import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  position: relative;
`;

export const Menu = styled.div`
  position: absolute;
  width: 120px;
  left: calc(50% - 60px);
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;
  box-shadow: 0px 0px 2px #00000026;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: -10px;
    left: calc(50% - 15px);
    box-sizing: border-box;

    border: 1em solid transparent;
    border-color: transparent transparent #fff #fff;

    transform: rotate(135deg);

    box-shadow: -3px 3px 4px -3px #00000026;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;

  div {
    & + div {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 0.5px solid #eee;
    }
  }

  button {
    font-size: 16px;
    color: #999999;
    display: flex;
    text-align: center;

    span {
      margin-left: 8px;
    }
  }
`;

export const Links = styled(Link)`
    font-size: 16px;
    color: #999999;
    display: flex;
    text-align: center;

    span {
      margin-left: 8px;
    }
  }
`;
