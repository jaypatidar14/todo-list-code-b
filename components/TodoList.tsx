"use client";

import { useState } from 'react';
import { Trash2, Edit, Check, X, Plus } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button onClick={saveEdit} className="text-green-500 hover:text-green-600">
                  <Check className="w-5 h-5" />
                </button>
                <button onClick={cancelEdit} className="text-red-500 hover:text-red-600">
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4"
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo)} className="text-blue-500 hover:text-blue-600">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}