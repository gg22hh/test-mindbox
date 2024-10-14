import React, { FC, useState, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../hooks';
import { addNewTodo } from '../../store/TodoSlice';
import arrow from '../../assets/arrow.png';
import './NewTodoForm.scss';

interface NewTodoFormProps {
  show: boolean;
  setShow: (status: boolean) => void;
}

export const NewTodoForm: FC<NewTodoFormProps> = React.memo(
  ({ show, setShow }) => {
    const [newTodoValue, setNewTodoValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const addTodo = useCallback<React.FormEventHandler<HTMLFormElement>>(
      (e) => {
        e.preventDefault();
        if (newTodoValue) {
          dispatch(addNewTodo(newTodoValue));
        }
        setNewTodoValue('');
        setShow(true);
      },
      [newTodoValue, dispatch, setShow]
    );

    const arrowClass = useMemo(
      () => (show ? 'todo__arrow active' : 'todo__arrow'),
      [show]
    );

    return (
      <form className="todo__form" onSubmit={addTodo} data-testid="todo-form">
        <button
          onClick={() => setShow(!show)}
          className="todo__form-button"
          type="button"
        >
          <img className={arrowClass} src={arrow} alt="" />
        </button>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
        />
      </form>
    );
  }
);
