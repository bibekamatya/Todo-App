"use client";
import { useState, useTransition } from "react";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { createTodo, updateTodo, deleteTodo, getTodos } from "@/app/actions/todoActions";
import { signOut } from "next-auth/react";

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoListProps {
  initialTodos: Todo[];
  user: any;
}

export default function TodoList({ initialTodos, user }: TodoListProps) {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(initialTodos);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleFilterChange = async (newFilter: "all" | "active" | "completed") => {
    setFilter(newFilter);
    startTransition(async () => {
      const filteredTodos = await getTodos(newFilter);
      setTodos(filteredTodos);
    });
  };

  const handleAddTodo = async (formData: { name: string; description: string }) => {
    const optimisticTodo = {
      _id: Date.now().toString(),
      title: formData.name,
      description: formData.description,
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos((prev) => [optimisticTodo, ...prev]);
    setOpen(false);

    startTransition(async () => {
      await createTodo(formData.name, formData.description);
      const refreshed = await getTodos(filter);
      setTodos(refreshed);
    });
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
    );

    startTransition(async () => {
      await updateTodo(id, !completed);
    });
  };

  const handleDelete = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));

    startTransition(async () => {
      await deleteTodo(id);
    });
  };

  const allTodos = initialTodos.length;
  const completedCount = initialTodos.filter(t => t.completed).length;
  const activeCount = allTodos - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl" />
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  )}
                </div>
                <div>
                  <h1 className="text-base sm:text-xl font-bold text-white">TaskFlow Pro</h1>
                  <p className="text-xs text-purple-200 hidden sm:block">{user?.name || user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition backdrop-blur-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Stats Sidebar - Left on Desktop, Top on Mobile */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">Total</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">{allTodos}</h3>
                    </div>
                    <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1">Active</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeCount}</h3>
                    </div>
                    <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Done</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">{completedCount}</h3>
                    </div>
                    <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">My Tasks</h2>
                <button
                  onClick={() => setOpen(true)}
                  disabled={isPending}
                  className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition shadow-lg disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Task
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 border-b bg-gray-50/50">
              <div className="flex gap-2">
                {(["all", "active", "completed"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFilterChange(f)}
                    disabled={isPending}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      filter === f
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100 border"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Todo List */}
            <div className="p-6">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks found</h3>
                  <p className="text-sm text-gray-500">
                    {filter === "all" ? "Create your first task to get started" : `No ${filter} tasks`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((item, index) => (
                    <div
                      key={item._id}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group animate-slideIn"
                    >
                      <div className="flex items-start gap-4">
                        {/* Custom Checkbox */}
                        <button
                          onClick={() => handleToggle(item._id, item.completed)}
                          className="mt-1 flex-shrink-0"
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                            item.completed 
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-lg" 
                              : "border-gray-300 hover:border-purple-500 hover:shadow-md"
                          }`}>
                            {item.completed && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-gray-900 mb-1 transition-all ${
                            item.completed ? "line-through text-gray-400" : ""
                          }`}>
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className={`text-sm transition-all ${
                              item.completed ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog isOpen={open} onClose={() => setOpen(false)} title="Create New Task">
        <Form onSubmit={handleAddTodo} />
      </Dialog>
    </div>
  );
}
