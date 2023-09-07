import {
  useReducer,
  useRef,
  useState
} from 'react';
import './styles/todos.scss';
import Input from '../input/input';
import {
  TodoState,
  Todo,
  TodosActions,
  TodosFiltersEnum
} from '../../types/todo';
import TodosList from '../todos-list/todos-list';
import { getFilteredTodos } from '../../utils/get-filtered-todos';
import TodosFilters from '../todos-filters/todos-filters';

const initialTasks: TodoState = {
  todos: [],
  filteredTodos: [],
  filter: TodosFiltersEnum.All
};

const tasksReducer = (
  state: TodoState,
  action: { type: string; payload?: Todo | TodosFiltersEnum; }
): TodoState => {
  switch (action.type) {
    case TodosActions.Add:
      if (action.payload) {
        const todosWithNew = [...state.todos, action.payload as Todo];
        return {
          ...state,
          todos: todosWithNew,
          filteredTodos: getFilteredTodos(state.filter, todosWithNew)
        }
      }
      return { ...state }
    case TodosActions.Edit:
      if (action.payload) {
        const editPayload = action.payload as Todo;
        const todosWithEdited = state.todos.map((todo) => {
          if (todo.id === editPayload?.id) {
            return action.payload as Todo
          }
          return todo
        });

        return {
          ...state,
          todos: todosWithEdited,
          filteredTodos: getFilteredTodos(state.filter, todosWithEdited)
        }
      };
      return { ...state }
    case TodosActions.Clear:
      const onlyActiveTodos = getFilteredTodos(TodosFiltersEnum.Active, state.todos);
      return {
        ...state,
        todos: onlyActiveTodos,
        filteredTodos: getFilteredTodos(state.filter, onlyActiveTodos)
      }
    case TodosActions.EditFilter:
      return {
        ...state,
        filter: action.payload as TodosFiltersEnum,
        filteredTodos: getFilteredTodos(action.payload as TodosFiltersEnum, state.todos)
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
          id: (Math.random() + tasks.todos.length + 1).toString(),
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

  const handleEditFilter = (filter: TodosFiltersEnum) => {
    dispatch({
      type: TodosActions.EditFilter,
      payload: filter
    })
  }

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
          <TodosList tasks={tasks.filteredTodos} handleEditTask={handleEditTask} />
        }
      </form>
      <TodosFilters
        tasks={tasks.todos}
        filter={tasks.filter}
        handleEditFilter={handleEditFilter}
        handleClearCompletedTasks={handleClearCompletedTasks}
      />
    </div>
  );
}

export default Todos;