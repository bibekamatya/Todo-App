"use client";
import { useState, useTransition } from "react";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { getTodos } from "@/app/actions/todoActions";
import { signOut } from "next-auth/react";
import Header from "./Header";
import StatusCards from "./StatusCards";
import TodoList from "./TodoList";
import CardHeader from "./CardHeader";
import Pagination from "./Pagination";
import { TodoProps, type Todo } from "@/app/types";
import toast, { Toaster } from "react-hot-toast";

export default function Todo({ todoData, user }: TodoProps) {
  const { page, totalPages: initialTotalPages } = todoData;
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(todoData?.todos || []);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const handlePageChange = (newPage: number) => {
    startTransition(async () => {
      try {
        const result = await getTodos(filter, newPage);
        setCurrentPage(newPage);
        setTodos(result.todos);
        setTotalPages(result.totalPages);
      } catch (error) {
        toast.error("Failed to load todos");
      }
    });
  };
  const handleFilterChange = (newFilter: "all" | "active" | "completed") => {
    setFilter(newFilter);
    startTransition(async () => {
      const result = await getTodos(newFilter, 1);
      setCurrentPage(1);
      setTodos(result.todos);
      setTotalPages(result.totalPages);
    });
  };

  return (
    <div className="h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="h-full">
        <Header signOut={signOut} user={user} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 h-[calc(100vh-80px)] py-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Stats Sidebar */}
            <div className="lg:w-64 shrink-0">
              <StatusCards todoData={todoData} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex-1 flex flex-col">
                {/* Card Header */}
                <div className="shrink-0">
                  <CardHeader
                    isPending={isPending}
                    setOpen={(value) => setOpen(value)}
                  />
                </div>
                
                {/* Filters */}
                <div className="px-5 py-3 border-b bg-gray-50/50 shrink-0">
                  <div className="flex gap-2">
                    {(["all", "active", "completed"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => handleFilterChange(f)}
                        disabled={isPending}
                        className={`px-4 py-2 rounded-full text-sm transition ${
                          filter === f
                            ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-white text-gray-600 hover:bg-gray-100 border"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Todo List - Scrollable */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <TodoList
                    filter={filter}
                    todos={todos}
                    setTodos={setTodos}
                    setCurrentPage={setCurrentPage}
                    setTotalPages={setTotalPages}
                    isPending={isPending}
                  />
                </div>
                
                {/* Pagination - Fixed at bottom */}
                <div className="bg-gray-50/50 shrink-0">
                  <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create New Task"
      >
        <Form
          filter={filter}
          currentPage={currentPage}
          setOpen={(value) => setOpen(value)}
          setTodos={setTodos}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      </Dialog>
      <Toaster position="top-center" />{" "}
    </div>
  );
}
