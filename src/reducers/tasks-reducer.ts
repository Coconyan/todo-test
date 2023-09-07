import {
  TodoState,
  TodosFiltersEnum,
  Todo,
  TodosActions
} from "../types/todo";
import { getFilteredTodos } from "../utils/get-filtered-todos";

export const initialTasks: TodoState = {
  todos: [],
  filteredTodos: [],
  filter: TodosFiltersEnum.All
};

export const tasksReducer = (
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
