import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { TodosBottom } from './TodosBottom';
import { deleteTodos } from '../../store/TodoSlice';

const mockStore = configureStore([]);

describe('TodosBottom', () => {
  let store;
  let props;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    props = {
      todosLeft: 3,
      todosStatus: 'all',
      setTodosStatus: jest.fn(),
    };
  });

  it('отображает правильное количество оставшихся задач', () => {
    render(
      <Provider store={store}>
        <TodosBottom {...props} />
      </Provider>
    );

    expect(screen.getByText('3 items left')).toBeTruthy();
  });

  it('отображает "1 item left" когда осталась одна задача', () => {
    props.todosLeft = 1;
    render(
      <Provider store={store}>
        <TodosBottom {...props} />
      </Provider>
    );

    expect(screen.getByText('1 item left')).toBeTruthy();
  });

  it('вызывает setTodosStatus при нажатии на кнопки статуса', () => {
    render(
      <Provider store={store}>
        <TodosBottom {...props} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Active'));
    expect(props.setTodosStatus).toHaveBeenCalledWith('active');

    fireEvent.click(screen.getByText('Completed'));
    expect(props.setTodosStatus).toHaveBeenCalledWith('completed');

    fireEvent.click(screen.getByText('All'));
    expect(props.setTodosStatus).toHaveBeenCalledWith('all');
  });

  it('вызывает deleteTodos при нажатии на кнопку удаления', () => {
    render(
      <Provider store={store}>
        <TodosBottom {...props} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Delete todos'));
    expect(store.dispatch).toHaveBeenCalledWith(deleteTodos());
  });
});
