import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Todo } from './Todo';

describe('Todo компонент', () => {
  const mockChangeStatus = jest.fn();

  it('отображает заголовок задачи', () => {
    render(<Todo title="Тестовая задача" completed={false} changeStatus={mockChangeStatus} />);
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('отмечает чекбокс, если задача выполнена', () => {
    render(<Todo title="Выполненная задача" completed={true} changeStatus={mockChangeStatus} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('не отмечает чекбокс, если задача не выполнена', () => {
    render(<Todo title="Невыполненная задача" completed={false} changeStatus={mockChangeStatus} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('вызывает функцию changeStatus при клике на чекбокс', () => {
    render(<Todo title="Кликабельная задача" completed={false} changeStatus={mockChangeStatus} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockChangeStatus).toHaveBeenCalledTimes(1);
  });

  it('применяет класс "completed" к заголовку, если задача выполнена', () => {
    render(<Todo title="Выполненная задача" completed={true} changeStatus={mockChangeStatus} />);
    expect(screen.getByText('Выполненная задача')).toHaveClass('todo__name completed');
  });

  it('не применяет класс "completed" к заголовку, если задача не выполнена', () => {
    render(<Todo title="Невыполненная задача" completed={false} changeStatus={mockChangeStatus} />);
    expect(screen.getByText('Невыполненная задача')).toHaveClass('todo__name');
    expect(screen.getByText('Невыполненная задача')).not.toHaveClass('completed');
  });
});