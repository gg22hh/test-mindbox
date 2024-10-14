import React, { FC, useEffect, useCallback, useMemo } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useTodosLeft,
  useTodosStatus,
} from '../../hooks';
import { toggleItem, fetchTodos } from '../../store/TodoSlice';
import loadingGif from '../../assets/loading.gif';
import { Todo } from '../Todo/Todo';
import { TodosBottom } from '../TodosBottom/TodosBottom';
import './Todos.scss';
import { ITodos } from '../../types/types';

export const Todos: FC = () => {
  const loading = useAppSelector((state) => state.todos.loading);
  const { filtredTodos, todosStatus, setTodosStatus } = useTodosStatus();
  const todosLeft = useTodosLeft();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !localStorage.getItem('todos') && dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggleItem = useCallback(
    (todo: ITodos) => {
      dispatch(toggleItem(todo));
    },
    [dispatch]
  );

  const todosList = useMemo(
    () =>
      filtredTodos?.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          changeStatus={() => handleToggleItem(todo)}
        />
      )),
    [filtredTodos, handleToggleItem]
  );

  return (
    <div className="todos">
      {loading ? (
        <img className="loading" src={loadingGif} alt="Loading..." />
      ) : (
        <>
          <div className="todos__list">
            {filtredTodos.length !== 0 ? (
              todosList
            ) : (
              <div className="todos__empty">There is no tasks</div>
            )}
          </div>
          <TodosBottom
            todosLeft={todosLeft}
            todosStatus={todosStatus}
            setTodosStatus={setTodosStatus}
          />
        </>
      )}
    </div>
  );
};
