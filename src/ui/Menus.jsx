import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from './useOutsideClick';

/*eslint-disable*/
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

/*eslint-disable*/
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

/*eslint-disable*/
const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

/*eslint-disable*/
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPostiion] = useState(null);

  const close = () => setOpenId('');
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPostiion }}>
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPostiion } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    openId === '' || openId !== id ? open(id) : close();

    const rect = e.target.closest('button').getBoundingClientRect();
    setPostiion({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  if (openId !== id) return null;

  const { ref } = useOutsideClick(() => {
    close();
  }, false);

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
