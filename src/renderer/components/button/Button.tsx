import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Button };
