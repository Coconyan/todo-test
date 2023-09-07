export type Todo = {
  id: string,
  description: string,
  isCompleted: boolean
};

export type TodoState = {
  todos: Todo[],
  filteredTodos: Todo[],
  filter: TodosFiltersEnum
};

export enum TodosActions {
  Add = "addTodo",
  Edit = "editTodo",
  Clear = "clearTodos",
  EditFilter = "editFilter"
};

export enum TodosFiltersEnum {
  All = "All",
  Active = "Active",
  Completed = "Completed"
};
