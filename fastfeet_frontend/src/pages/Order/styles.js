import styled from 'styled-components';
import { darken } from 'polished';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Container = styled.div`
  margin: 35px 120px 0;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: bold;
    font-size: 24px;
    color: #444444;
    margin-bottom: 30px;
    width: 1200px;
    align-self: center;
  }

  /* div.modal {
    position: fixed;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  } */
`;
export const Utils = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 1200px;

  input {
    width: 237px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    background: #fff url('assets/search.svg') no-repeat 10px center;
    background-size: 16px 16px;
    padding-left: 35px;
  }

  button {
    width: 143px;
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
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
export const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  width: 1200px;
  font-weight: bold;
`;
export const TableRow = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  height: 57px;
  width: 1200px;
  background: #fff;
  margin-bottom: 15px;
  color: #666666;
  border-radius: 4px;
  font-size: 16px;
`;

export const Id = styled.div`
  flex-basis: 4.5%;
  padding-left: 15px;
`;
export const Recipient = styled.div`
  flex-basis: 20%;
`;
export const Deliveryman = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
  }
`;
export const City = styled.div`
  flex-basis: 17%;
`;
export const State = styled.div`
  flex-basis: 17%;
`;
export const Status = styled.div`
  flex-basis: 17%;

  span {
    height: 27px;
    width: 110px;
    background: ${props => props.status};
    color: ${props => props.status && darken(0.5, props.status)};
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 12px;
  }
`;
export const Action = styled.div`
  flex-basis: 4.5%;
  display: flex;
  justify-content: center;

  button {
    border: 0;
    background: none;
  }
`;

export const Pages = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  margin: 35px 0 45px;

  strong {
    margin: 0 20px;
    color: #666666;
    font-weight: normal;
    size: 12px;
  }

  button {
    background: none;
    border: 0;
  }
`;

export const Next = styled(MdChevronRight)`
  font-size: 36px;
  color: ${props => (props.active ? '#666' : '#ddd')};
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

export const Previous = styled(MdChevronLeft)`
  font-size: 36px;
  color: ${props => (props.active ? '#666' : '#ddd')};
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

export const Modal = styled.div`
  display: ${props => (props.showModal ? 'flex' : 'none')};
  position: absolute;
  top: 20%;
  left: 25%;
  right: 25%;
  bottom: 20%;
  background: #fff;
  border: 1px solid #f5f5f5;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;

  span {
    font-size: 16px;
    color: #444444;
    margin-bottom: 5px;
  }

  strong {
    font-size: 18px;
    color: #444444;
    margin-bottom: 10px;
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

  div {
    & + div {
      margin: 10px 20px 0;
      padding-top: 21px;
      border-top: 0.5px solid #eee;
    }
  }

  div.signature {
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    width: 200px;
  }

  img {
    width: 120px;
  }
`;

export const ModalRecipient = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  margin: 20px 20px 0;
`;
export const ModalDates = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 200px;
`;
