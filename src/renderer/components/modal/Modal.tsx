import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from 'styled-components';

interface IModal {
  children: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, show, setShow }: IModal) {
  return (
    show && (
      <ModalWrapper onClick={() => setShow(!show)}>
        <ModalContainer onClick={(evt) => evt.stopPropagation()}>
          {children}
        </ModalContainer>
      </ModalWrapper>
    )
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 32px;
  height: max-content;
  width: max-content;

  border-radius: 16px;

  background: #fff;
`;
