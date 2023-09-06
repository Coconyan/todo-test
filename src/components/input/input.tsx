import './styles/input.scss';
import { ReactComponent as ArrowDown } from '../../assets/down-arrow.svg';

type PropsType = {
  inputRef: React.RefObject<HTMLInputElement>,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  placeholder?: string,
  type?: "text"
}

function Input(props: PropsType) {
  const {
    inputRef,
    placeholder,
    type = "text",
    isOpen,
    setIsOpen
  } = props;

  return (
    <div className="input">
      <ArrowDown className={isOpen ? "open" : ""} onClick={() => setIsOpen((prev) => !prev)} />
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;