import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewTodoForm } from './NewTodoForm';
import * as hooks from '../../hooks';
import { addNewTodo } from '../../store/TodoSlice';

jest.mock('../../hooks');
jest.mock('../../store/TodoSlice');

describe('NewTodoForm компонент', () => {
  const mockSetShow = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (hooks.useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('отображает форму с полем ввода и кнопкой', () => {
    render(<NewTodoForm show={true} setShow={mockSetShow} />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('вызывает setShow при клике на кнопку', () => {
    render(<NewTodoForm show={true} setShow={mockSetShow} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetShow).toHaveBeenCalledWith(false);
  });

  it('добавляет новую задачу при отправке формы', () => {
    render(<NewTodoForm show={true} setShow={mockSetShow} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(screen.getByTestId('todo-form'));
    expect(mockDispatch).toHaveBeenCalledWith(addNewTodo('Новая задача'));
    expect(input).toHaveValue('');
    expect(mockSetShow).toHaveBeenCalledWith(true);
  });

  it('не добавляет пустую задачу', () => {
    render(<NewTodoForm show={true} setShow={mockSetShow} />);
    fireEvent.submit(screen.getByTestId('todo-form'));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('применяет правильный класс к стрелке в зависимости от prop show', () => {
    const { rerender } = render(<NewTodoForm show={true} setShow={mockSetShow} />);
    expect(screen.getByRole('img')).toHaveClass('todo__arrow active');

    rerender(<NewTodoForm show={false} setShow={mockSetShow} />);
    expect(screen.getByRole('img')).toHaveClass('todo__arrow');
    expect(screen.getByRole('img')).not.toHaveClass('active');
  });
});