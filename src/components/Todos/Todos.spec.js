import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Todos } from './Todos';
import * as hooks from '../../hooks';
import { fetchTodos } from '../../store/TodoSlice';

jest.mock('../../hooks');
jest.mock('../../store/TodoSlice');

describe('Todos', () => {
  beforeEach(() => {
    hooks.useAppSelector.mockImplementation((selector) =>
      selector({ todos: { loading: false } })
    );
    hooks.useAppDispatch.mockReturnValue(jest.fn());
    hooks.useTodosLeft.mockReturnValue(3);
    hooks.useTodosStatus.mockReturnValue({
      filtredTodos: [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
      ],
      todosStatus: 'all',
      setTodosStatus: jest.fn(),
    });

    fetchTodos.mockReturnValue({ type: 'FETCH_TODOS' });
  });

  it('отображает список задач, когда они есть', () => {
    render(
      <Provider
        store={{
          getState: () => ({}),
          dispatch: jest.fn(),
          subscribe: jest.fn(),
        }}
      >
        <Todos />
      </Provider>
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('отображает сообщение, когда задач нет', () => {
    hooks.useTodosStatus.mockReturnValue({
      filtredTodos: [],
      todosStatus: 'all',
      setTodosStatus: jest.fn(),
    });

    render(
      <Provider
        store={{
          getState: () => ({}),
          dispatch: jest.fn(),
          subscribe: jest.fn(),
        }}
      >
        <Todos />
      </Provider>
    );

    expect(screen.getByText('There is no tasks')).toBeInTheDocument();
  });

  it('отображает загрузочное изображение при загрузке', () => {
    hooks.useAppSelector.mockImplementation((selector) =>
      selector({ todos: { loading: true } })
    );

    render(
      <Provider
        store={{
          getState: () => ({}),
          dispatch: jest.fn(),
          subscribe: jest.fn(),
        }}
      >
        <Todos />
      </Provider>
    );

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });
});
