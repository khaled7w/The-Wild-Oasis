import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../contexts/DarkModeContext';

function DarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkMode;
