import { TodosFiltersEnum } from '../types/todo';
import { getFilteredTodos } from './get-filtered-todos';
import {
  fakeTodos,
  fakeCompletedTodos,
  fakeActiveTodos
} from '../mocks/fake-todos';

describe('Function: getFilteredTodos', () => {
  it('should return todos when we choose filter All', () => {
    const filteredTodosAll = getFilteredTodos(TodosFiltersEnum.All, fakeTodos)
    expect(filteredTodosAll).toEqual(fakeTodos);
  });

  it('should return only completed todos when we choose filter Completed', () => {
    const filteredTodosCompleted = getFilteredTodos(TodosFiltersEnum.Completed, fakeTodos)
    expect(filteredTodosCompleted).toEqual(fakeCompletedTodos);
  });

  it('should return todos when we choose filter All', () => {
    const filteredTodoActive = getFilteredTodos(TodosFiltersEnum.Active, fakeTodos)
    expect(filteredTodoActive).toEqual(fakeActiveTodos);
  });
});
