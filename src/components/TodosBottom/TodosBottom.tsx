import React, { FC, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../../store/TodoSlice';
import './TodosBottom.scss';

interface TodosBottomProps {
  todosLeft: number | undefined;
  todosStatus: string;
  setTodosStatus: (status: string) => void;
}

const getLeftText = (todosLeft: number | undefined) =>
  todosLeft === 1 ? `${todosLeft} item left` : `${todosLeft} items left`;

export const TodosBottom: FC<TodosBottomProps> = React.memo(
  ({ todosLeft, todosStatus, setTodosStatus }) => {
    const dispatch = useDispatch();

    const left = useMemo(() => getLeftText(todosLeft), [todosLeft]);

    const getStatusButtonClass = useCallback(
      (status: string) =>
        todosStatus === status
          ? 'todos__status-item active'
          : 'todos__status-item',
      [todosStatus]
    );

    const handleSetStatus = useCallback(
      (status: string) => () => setTodosStatus(status),
      [setTodosStatus]
    );

    const handleDeleteTodos = useCallback(
      () => dispatch(deleteTodos()),
      [dispatch]
    );

    return (
      <div className="todos__bottom">
        <div className="todos__left">{left}</div>
        <div className="todos__status">
          <button
            className={getStatusButtonClass('all')}
            onClick={handleSetStatus('all')}
          >
            All
          </button>
          <button
            className={getStatusButtonClass('active')}
            onClick={handleSetStatus('active')}
          >
            Active
          </button>
          <button
            className={getStatusButtonClass('completed')}
            onClick={handleSetStatus('completed')}
          >
            Completed
          </button>
        </div>
        <button className="todos__button" onClick={handleDeleteTodos}>
          Delete todos
        </button>
      </div>
    );
  }
);
