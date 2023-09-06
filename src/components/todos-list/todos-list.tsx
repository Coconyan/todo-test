import { Todo } from '../../types/todo';
import TodosListItem from '../todos-list-item/todos-list-item';
import './styles/todos-list.scss';

type PropsType = {
  tasks: Todo[],
  handleEditTask: (task: Todo) => void
}

function TodosList(props: PropsType) {
  const {
    tasks,
    handleEditTask
  } = props;

  return (
    <ul className="todos-list">
      {tasks.map((task) =>
        <TodosListItem
          key={task.id}
          task={task}
          handleEditTask={handleEditTask}
        />
      )}
    </ul>
  );
}

export default TodosList;