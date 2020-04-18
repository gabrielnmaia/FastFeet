import styled from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
`;
export const Order = styled.div`
  flex-basis: 10%;
  padding-left: 15px;
`;
export const ProblemDescription = styled.div`
  flex-basis: 80%;
`;
export const Action = styled.div`
  flex-basis: 10%;
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
  top: 30%;
  left: 35%;
  right: 35%;
  bottom: 30%;
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
    padding: 20px 40px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
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
