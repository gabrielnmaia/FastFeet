import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 425px;
  text-align: center;
  background: #fff;
  padding: 60px 30px;

  img {
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      text-align: left;
      color: #444444;
      font-weight: bold;
      margin-bottom: 10px;
    }

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      margin-bottom: 10px;
      padding: 0 15px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #f64c75;
      margin-bottom: 7px;
    }

    button {
      background: #7d40e7;
      border-radius: 4px;
      height: 45px;
      margin-top: 10px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
