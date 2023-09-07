import {
  Todo,
  TodosFiltersEnum
} from '../../types/todo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';
import './styles/todos-filters.scss';

type PropsType = {
  tasks: Todo[],
  filter: TodosFiltersEnum,
  handleEditFilter: (filter: TodosFiltersEnum) => void,
  handleClearCompletedTasks: () => void
}

function TodosFilters(props: PropsType) {
  const {
    tasks,
    filter,
    handleEditFilter,
    handleClearCompletedTasks
  } = props;

  return (
    <div className="todos-filters">
      <div className="todos-filters__count">
        {getFilteredTodos(TodosFiltersEnum.Active, tasks).length} items left
      </div>
      <div className="todos-filters__nav">
        {(Object.keys(TodosFiltersEnum) as Array<keyof typeof TodosFiltersEnum>).map((key) =>
        <p
          key={TodosFiltersEnum[key]}
          className={filter === key ? 'active' : ''}
          onClick={() => handleEditFilter(TodosFiltersEnum[key])}
        >
          {TodosFiltersEnum[key]}
        </p>
        )}
      </div>
      <div className="todos-filters__clear">
        <p onClick={handleClearCompletedTasks}>Clear completed</p>
      </div>
    </div>
  );
}

export default TodosFilters;