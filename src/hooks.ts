import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { ITodos } from './types/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodosStatus = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const [todosStatus, setTodosStatus] = useState<string>('all');
  const [filtredTodos, setFiltredTodos] = useState<ITodos[]>([]);
  useEffect(() => {
    if (todosStatus === 'all') {
      setFiltredTodos(todos);
    } else if (todosStatus === 'active') {
      setFiltredTodos(todos.filter((todo) => todo.completed === false));
    } else if (todosStatus === 'completed') {
      setFiltredTodos(todos.filter((todo) => todo.completed === true));
    }
  }, [todosStatus, todos]);

  return { filtredTodos, todosStatus, setTodosStatus };
};

export const useTodosLeft = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const [todosLeft, setTodosLeft] = useState<number>();

  useEffect(() => {
    let todosTotal = 0;
    for (let i in todos) {
      if (!todos[i].completed) {
        todosTotal += 1;
      }
    }
    setTodosLeft(todosTotal);
  }, [todos]);

  return todosLeft;
};
