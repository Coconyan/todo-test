import {
  act,
  render,
  screen
} from '@testing-library/react';
import Todos from './todos';
import userEvent from '@testing-library/user-event';
import { TodosFiltersEnum } from '../../types/todo';

describe('Component: Todos', () => {
  it('should render input correctly', () => {
    render(<Todos />);
    expect(screen.getByPlaceholderText(/What needs to be done/i)).toBeInTheDocument();
  });

  it('should change input text', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('input');

    act(() => {
      userEvent.paste(inputElement, 'test');
    });
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    act(() => {
      userEvent.keyboard("{enter}");
    });
    expect(screen.getByPlaceholderText(/What needs to be done/i)).toBeInTheDocument();
  });

  it('should open todos-list and render when we add', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('input');
    const svgListOpenElement = screen.getByTestId('svg-list-open');

    act(() => {
      userEvent.paste(inputElement, 'test');
    });
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    act(() => {
      userEvent.keyboard("{enter}");
    });
    expect(screen.getByPlaceholderText(/What needs to be done/i)).toBeInTheDocument();
    expect(svgListOpenElement).toBeInTheDocument();
    act(() => {
      userEvent.click(svgListOpenElement);
    });
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should remove completed task when we click clear', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('input');
    const svgListOpenElement = screen.getByTestId('svg-list-open');

    act(() => {
      userEvent.paste(inputElement, 'test0');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test1');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test2');
      userEvent.keyboard("{enter}");
      userEvent.click(svgListOpenElement);
    });

    const test1 = screen.getByText(/test1/i);
    act(() => {
      userEvent.click(test1);
      userEvent.click(screen.getByTestId('clear-completed'));
    });

    expect(test1).not.toBeInTheDocument();
    expect(screen.getByText(/test0/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
  });

  it('should filter active tasks when we click clear', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('input');
    const svgListOpenElement = screen.getByTestId('svg-list-open');

    act(() => {
      userEvent.paste(inputElement, 'test0');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test1');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test2');
      userEvent.keyboard("{enter}");
      userEvent.click(svgListOpenElement);
    });

    const test1 = screen.getByText(/test1/i);
    act(() => {
      userEvent.click(test1);
      userEvent.click(screen.getByTestId(TodosFiltersEnum.Active));
    });

    expect(test1).not.toBeInTheDocument();
    expect(screen.getByText(/test0/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
  });

  it('should filter completed tasks when we click clear', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('input');
    const svgListOpenElement = screen.getByTestId('svg-list-open');

    act(() => {
      userEvent.paste(inputElement, 'test0');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test1');
      userEvent.keyboard("{enter}");
      userEvent.paste(inputElement, 'test2');
      userEvent.keyboard("{enter}");
      userEvent.click(svgListOpenElement);
    });

    const test1 = screen.getByText(/test1/i);
    const test2 = screen.getByText(/test2/i);
    const test0 = screen.getByText(/test0/i);
    act(() => {
      userEvent.click(test1);
      userEvent.click(screen.getByTestId(TodosFiltersEnum.Completed));
    });

    expect(test1).toBeInTheDocument();
    expect(test2).not.toBeInTheDocument();
    expect(test0).not.toBeInTheDocument();
  });
});
