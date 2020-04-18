import styled from 'styled-components';

export const LabelContainer = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .image-placeholder {
    background: #f4effc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed #a28fd0;
    border-radius: 50%;
    height: 150px;
    width: 150px;
    transition: border-color 0.2s;

    span {
      font-size: 16px;
      color: #a28fd0;
      font-weight: bold;
      transition: color 0.2s;
    }
  }
  input {
    display: none;
  }
`;
