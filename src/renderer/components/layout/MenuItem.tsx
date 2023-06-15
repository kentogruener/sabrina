import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export interface IMenuItem {
  title: string;
  href: string;
}

export default function MenuItem({ title, href }: IMenuItem) {
  const { pathname } = useLocation();
  const active = pathname === href;

  return (
    <MenuItemContainer key={title} $active={active}>
      <MenuItemLink to={href}>
        <DetailsWrapper $active={active}>
          <MenuItemTitle $active={active}>{title}</MenuItemTitle>
        </DetailsWrapper>
      </MenuItemLink>
    </MenuItemContainer>
  );
}

interface IActive {
  $active: boolean;
}

const MenuItemContainer = styled.li<IActive>`
  position: relative;

  height: 40px;
  width: auto;

  display: flex;
  align-items: center;

  background-color: ${(props) => (props.$active ? '#ffffff' : 'transparent')};

  &:hover {
    background-color: ${(props) =>
      props.$active ? '#ffffff' : 'rgba(225, 223, 221, 0.8)'};
  }

  &:active {
    background-color: ${(props) =>
      props.$active ? '#ffffff' : 'rgba(210, 208, 206, 0.8)'};
  }
`;

const MenuItemLink = styled(NavLink)`
  height: 40px;

  display: flex;
  align-items: center;
  flex-grow: 1;

  padding: 0px 4px;

  text-decoration: none;
`;

const DetailsWrapper = styled.span<IActive>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;

  ${(props) =>
    props.$active &&
    `
        &::before {
            position: absolute;
            content: '';
            width: 4px;
            height: 24px;
            background-color: #7a2c9e;
            border-radius: 4px;
            top: 8px;
        }
    `}
`;

const MenuItemTitle = styled.span<IActive>`
  line-height: 20px;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;

  font-weight: ${(props) => (props.$active ? '600' : '400')};

  color: #323130;
  font-size: 14px;

  -webkit-font-smoothing: antialiased;
  white-space: nowrap;

  padding-left: 8px;
`;
