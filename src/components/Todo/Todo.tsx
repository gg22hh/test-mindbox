import React, { FC } from 'react';
import './Todo.scss';

interface TodoProps {
  title: string;
  completed: boolean;
  changeStatus: () => void;
}

export const Todo: FC<TodoProps> = ({ title, completed, changeStatus }) => {
  return (
    <div className="todo">
      <div className="todo__box">
        <input type="checkbox" checked={completed} onChange={changeStatus} />
        <div className={completed ? 'todo__name completed' : 'todo__name'}>
          {title}
        </div>
      </div>
    </div>
  );
};
