import { useReducer, useRef, useState } from 'react';
import './styles/todos.scss';
import Input from '../input/input';

enum TodosActions {
  Add = "addTodo",
  Change = "changeTodo",
  Clear = "clearTodos"
}

type Todo = {
  id: number
  description: string
  isCompleted: boolean
}

type State = {
  todos: Todo[]
}

const initialTasks: State = {
  todos: [],
}

const tasksReducer = (
  state: State,
  action: { type: string; payload: Todo; }
): State => {
  switch (action.type) {
    case TodosActions.Add:
      let newTodos = [...state.todos, action.payload];
      return { ...state, todos: newTodos };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Todos() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  const handleAddTask = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      dispatch({
        type: TodosActions.Add,
        payload: {
          id: tasks.todos.length + 1,
          description: inputRef.current.value,
          isCompleted: false,
        },
      });
      inputRef.current.value = "";
    }
  }

  console.log(tasks.todos)

  return (
    <div className="todos">
      <form
        action=""
        onSubmit={handleAddTask}
      >
        <Input
          inputRef={inputRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          placeholder="What needs to be done"
        />
      </form>
      {
        Boolean(isOpen) &&
        <ul>
          {tasks.todos.map((task) =>
            <li key={task.id}>{task.description}</li>
          )}
        </ul>
      }

    </div>
  );
}

export default Todos;