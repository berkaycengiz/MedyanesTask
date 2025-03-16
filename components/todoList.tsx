import { useTodoStore } from "@/store/todoStore";
import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default function TodoList() {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<{ id: string; content: string } | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-8 bg-gradient-to-r from-blue-400 to-violet-400 rounded-lg shadow-xl">
      <div className="bg-pink-100 bg-opacity-20 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Todo List</h1>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-3 border-2 text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
            placeholder="Yeni görev ekle..."
          />
          <button
            onClick={async () => {
              if (newTodo.trim()) {
                await addTodo(newTodo);
                setNewTodo("");
              }
            }}
            className="bg-indigo-100 bg-opacity-10 border-2 shadow-lg border-rose-200 border-opacity-10 text-gray-800 p-3 rounded-md hover:bg-rose-200 hover:bg-opacity-40 hover:cursor-pointer transition"
          >
            Ekle
          </button>
        </div>
        <ul className="space-y-3">
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center p-4  border-2 border-rose-200 border-opacity-10 rounded-md shadow-lg">
                <span className="text-gray-800">{todo.content}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTodo(todo);
                      setEditContent(todo.content);
                      setIsModalOpen(true);
                    }}
                    className="text-gray-800 text-xl hover:text-rose-200  hover:cursor-pointer transition"
                  >
                    <MdOutlineEdit/>
                  </button>
                  <button
                    onClick={async () => {
                      await deleteTodo(todo.id);
                    }}
                    className="text-gray-800 text-xl hover:text-rose-200  hover:cursor-pointer transition"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-800 text-center mt-4">Henüz bir todo eklenmedi.</p>
          )}
        </ul>
      </div>

      {isModalOpen && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-black font-semibold mb-4">Görevi Güncelle</h2>
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border-2 text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                İptal
              </button>
              <button
                onClick={async () => {
                  console.log("Gönderilen içerik:", editContent); 
                  if (editContent.trim()) {
                    await updateTodo(selectedTodo.id, editContent);
                    setIsModalOpen(false);
                  }
                }}
                className="bg-purple-400 text-gray-800 px-4 py-2 rounded-md hover:bg-purple-300 transition"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
