import {
  useReducer,
  useRef,
  useState
} from 'react';
import './styles/todos.scss';
import Input from '../input/input';
import {
  Todo,
  TodosActions,
  TodosFiltersEnum
} from '../../types/todo';
import TodosList from '../todos-list/todos-list';
import TodosFilters from '../todos-filters/todos-filters';
import {
  tasksReducer,
  initialTasks
} from '../../reducers/tasks-reducer';

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