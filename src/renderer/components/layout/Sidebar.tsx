import styled from 'styled-components';
import MenuItem from './MenuItem';

const menu = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Import',
    href: '/import',
  },
];

export default function Sidebar() {
  return (
    <SidebarContainer>
      {menu.map((item) => {
        return (
          <MenuItem key={item.title} title={item.title} href={item.href} />
        );
      })}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  grid-area: sidebar;
  overflow: hidden auto;

  display: flex;
  flex-direction: column;

  border-right: 1px solid #d2d0ce;

  width: 200px;
  height: 100%;
  background-color: #f3f2f1;
`;
