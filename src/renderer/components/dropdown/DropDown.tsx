import { useState } from 'react';
import styled from 'styled-components';

interface IDropDown {
  data: {
    name: string;
    id: string;
  }[];
  selected: {
    name: string;
    id: string;
  } | null;
  setSelected: (select: { name: string; id: string }) => void;
  defaultText: string;
}

export default function DropDown({
  data,
  selected,
  setSelected,
  defaultText,
}: IDropDown) {
  const available = selected
    ? data.filter((item) => item.id !== selected.id)
    : data;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownWrapper>
      <DropdDownButton $open={open} onClick={() => setOpen((p) => !p)}>
        {selected ? selected.name : defaultText}
      </DropdDownButton>
      <DropDownContent $open={open} onClick={() => setOpen((p) => !p)}>
        {available.map((item) => {
          return (
            <DropDownItem
              type="button"
              key={item.id}
              onClick={() => setSelected(item)}
            >
              {item.name}
            </DropDownItem>
          );
        })}
      </DropDownContent>
    </DropDownWrapper>
  );
}

interface openProps {
  $open: boolean;
}

const DropDownWrapper = styled.div`
  height: 32px;
  width: 128px;
`;

const DropdDownButton = styled.button<openProps>`
  height: 100%;
  width: 100%;

  font-weight: 700;

  background: white;
  border: 1px solid #000;

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: ${(props) => (props.$open ? '0px' : '8px')};
  border-bottom-left-radius: ${(props) => (props.$open ? '0px' : '8px')};

  &:hover {
    background: #000;
    color: white;
  }

  outline: none;

  cursor: pointer;

  z-index: 5;
`;

const DropDownContent = styled.div<openProps>`
  position: relative;

  display: ${(props) => (props.$open ? 'flex' : 'none')};
  flex-direction: column;

  z-index: 200;
`;

const DropDownItem = styled.button`
  height: 32px;
  width: 128px;

  font-weight: 700;

  outline: none;

  background: white;
  border: 1px solid #000;

  &:hover {
    background: #000;
    color: white;
  }

  cursor: pointer;

  &:last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;
