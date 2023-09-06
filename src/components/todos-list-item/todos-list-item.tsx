import { Todo } from '../../types/todo';
import './styles/todos-list-item.scss';

type PropsType = {
  task: Todo,
  handleEditTask: (task: Todo) => void
}

function TodosListItem(props: PropsType) {
  const {
    task,
    handleEditTask
  } = props;

  return (
    <>
      <label className="todos-list-item" htmlFor={task.id.toString()}>
        <input
          type="checkbox"
          id={task.id.toString()}
          onChange={(e) => handleEditTask({id: task.id, description: task.description, isCompleted: e.target.checked})}
        />
        <span>{task.description}</span>
      </label>
    </>
  );
}

export default TodosListItem;