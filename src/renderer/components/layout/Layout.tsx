import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <AppViewPort>
      <Header />
      <Sidebar />
      <PageContainer>{children}</PageContainer>
    </AppViewPort>
  );
}

const AppViewPort = styled.div`
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'header header'
    'sidebar content';
`;

const PageContainer = styled.div`
  grid-area: content;

  background-color: #ffffff;

  overflow: auto;
`;
