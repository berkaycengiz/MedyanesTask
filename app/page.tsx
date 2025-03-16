'use client';
import '../styles/globals.css';
import TodoList from "@/components/todoList";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-300">
      <TodoList />
    </main>
  );
}
