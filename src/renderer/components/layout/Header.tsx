import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>Sabrina</HeaderTitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  height: 48px;
  grid-area: header;
  background: linear-gradient(
    200.96deg,
    #fedc2a -29.09%,
    #dd5789 51.77%,
    #7a2c9e 129.35%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-family: 'Pacifico', cursive;
  color: #ffffff;
`;
