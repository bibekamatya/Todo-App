"use client";
import { createTodo, getTodos } from "@/app/actions/todoActions";
import { FormProps } from "@/app/types";
import { useState, FormEvent, startTransition, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const Form = ({
  setTodos,
  setOpen,
  filter,
  currentPage,
  setCurrentPage,
  setTotalPages,
}: FormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setOpen(false);

    startTransition(async () => {
      await createTodo(name, description);
      const refreshed = await getTodos(filter, currentPage);
      setTodos(refreshed.todos);
      setCurrentPage(refreshed.page);
      setTotalPages(refreshed.totalPages);
      toast.success("Task added successfully");
    });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Task Name</label>
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter task..."
          className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Short description"
          className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full h-9 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        disabled={!name.trim()}
      >
        Add Todo
      </button>
    </form>
  );
};

export default Form;
