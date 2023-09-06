import { useReducer, useRef, useState } from 'react';
import './styles/todos.scss';
import Input from '../input/input';
import { Todo } from '../../types/todo';
import TodosList from '../todos-list/todos-list';
import { nanoid } from 'nanoid';

enum TodosActions {
  Add = "addTodo",
  Edit = "editTodo",
  Clear = "clearTodos"
};

type State = {
  todos: Todo[]
};

const initialTasks: State = {
  todos: [],
};

const tasksReducer = (
  state: State,
  action: { type: string; payload?: Todo; }
): State => {
  switch (action.type) {
    case TodosActions.Add:
      if (action.payload) {
        return { todos: [...state.todos, action.payload] }
      }
      return { todos: state.todos }
    case TodosActions.Edit:
      if (action.payload) {
        return {
          todos: state.todos.map((todo) => {
            if (todo.id === action.payload?.id) {
              return action.payload
            }
            return todo
          })
        }
      };
      return { todos: state.todos }
    case TodosActions.Clear:
      return {
        todos: state.todos.filter((todo) => !todo.isCompleted)
      }
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

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      dispatch({
        type: TodosActions.Add,
        payload: {
          id: nanoid(),
          description: inputRef.current.value,
          isCompleted: false,
        },
      });
      inputRef.current.value = "";
    }
  }

  const handleEditTask = (task: Todo) => {
    dispatch({
      type: TodosActions.Edit,
      payload: task
    })
  };

  const handleClearCompletedTasks = () => {
    dispatch({
      type: TodosActions.Clear
    })
  };

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
        {
          Boolean(isOpen) &&
          <TodosList tasks={tasks.todos} handleEditTask={handleEditTask} />
        }
      </form>
      {tasks.todos.filter((todo) => todo.isCompleted).length} completed
      <button onClick={handleClearCompletedTasks}>Clear completed tasks</button>
    </div>
  );
}

export default Todos;