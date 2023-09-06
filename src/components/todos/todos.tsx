import { useState } from 'react';
import './styles/todos.scss';
import Input from '../input/input';

function Todos() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="todos">
      <Input
        value={input}
        setValue={setInput}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        placeholder="What needs to be done"
      />
      {
        Boolean(isOpen) && <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      }

    </div>
  );
}

export default Todos;