import {
  Todo,
  TodosFiltersEnum
} from "../types/todo";

export const getFilteredTodos = (filter: TodosFiltersEnum, todos: Todo[]) => {
  switch (filter) {
    case TodosFiltersEnum.All:
      return todos
    case TodosFiltersEnum.Active:
      return todos.filter((todo) => !todo.isCompleted)
    case TodosFiltersEnum.Completed:
      return todos.filter((todo) => todo.isCompleted)  
    default:
      return todos
  }
};
