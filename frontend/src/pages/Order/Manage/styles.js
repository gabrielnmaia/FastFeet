import styled from 'styled-components';

export const Container = styled.div`
  margin: 35px 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  form {
    margin: 0px 120px 0;
    width: 1200px;
  }
`;
export const Title = styled.div`
  width: 1200px;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    font-weight: bold;
    font-size: 24px;
    color: #444444;
    margin-bottom: 30px;
    align-self: center;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  button.save {
    width: 112px;
    height: 36px;
    background: #7d40e7;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      padding-right: 5px;
    }
  }

  button.back {
    width: 112px;
    height: 36px;
    background: #cccccc;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
`;

export const FormPanel = styled.div`
  background: #fff;
  width: 1200px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 30px 30px;

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
    width: auto;
    padding: 0 15px;

    &::placeholder {
      color: #999;
    }
  }

  span {
    color: #f64c75;
    margin-top: 7px;
  }

  div.select-group {
    display: flex;
  }

  div.select {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;

    div:first-child {
      margin-right: 5px;
    }
    & + div {
      margin-left: 5px;
    }
  }

    label {
      text-align: left;
      color: #444444;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`;

export const Modal = styled.div`
  display: ${props => (props.showModal ? 'flex' : 'none')};
  position: absolute;
  top: 37%;
  left: 37%;
  right: 37%;
  bottom: 37%;
  background: #fff;
  border: 1px solid #f5f5f5;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;

  span {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
    margin-top: 50px;
  }

  button {
    margin-bottom: 50px;
    width: 112px;
    height: 36px;
    background: #cccccc;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
