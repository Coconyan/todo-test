import './styles/input.scss';
import { ReactComponent as ArrowDown } from '../../assets/down-arrow.svg';

type PropsType = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  placeholder?: string,
  type?: "text"
}

function Input(props: PropsType) {
  const {
    value,
    setValue,
    placeholder,
    type = "text",
    isOpen,
    setIsOpen
  } = props;

  return (
    <div className="input">
      <ArrowDown className={isOpen ? "open" : ""} onClick={() => setIsOpen((prev) => !prev)} />
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;