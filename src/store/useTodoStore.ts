import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text: any) =>
    set((state: { todos: any }) => ({
      todos: [...state.todos, { text, completed: false, id: Date.now() }],
    })),

  removeTodo: (id: any) =>
    set((state: any) => ({
      todos: state.todos.filter((e: any) => e.id !== id),
    })),
  toggleTodo: (id: any) =>
    set((state: any) => ({
      todos: state.todos.map((e: any) =>
        e.id === id ? { ...e, completed: !e.completed } : e,
      ),
    })),
}));

export default useTodoStore;
