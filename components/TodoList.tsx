import { startTransition } from "react";
import {
  deleteTodo,
  getTodos,
  updateTodoStatus,
} from "@/app/actions/todoActions";
import { TodoListProps } from "@/app/types";
import toast from "react-hot-toast";

const TodoList = ({
  todos,
  filter,
  setTodos,
  setTotalPages,
  setCurrentPage,
  isPending,
}: TodoListProps) => {
  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
    );
    startTransition(async () => {
      await updateTodoStatus(id, !completed);
    });
    toast.success(`Task marked as ${completed ? "incomplete" : "complete"}`);
  };

  const handleDelete = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));

    startTransition(async () => {
      await deleteTodo(id);
      const refreshedData = await getTodos(filter, 1);
      setTodos(refreshedData.todos);
      setTotalPages(refreshedData.totalPages);
      setCurrentPage(1);
    });
    toast.success("Task deleted successfully");
  };

  return (
    <div className="p-6 relative">
      {isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-gray-500">
            {filter === "all"
              ? "Create your first task to get started"
              : `No ${filter} tasks`}
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          {todos.map((item, index) => (
            <div
              key={item._id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg transition-all duration-300 group animate-slideIn"
            >
              <div className="flex items-start gap-4">
                {/* Custom Checkbox */}
                <button
                  onClick={() => handleToggle(item._id, item.completed)}
                  className="mt-1 shrink-0"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      item.completed
                        ? "bg-linear-to-br from-green-500 to-emerald-600 border-green-500 shadow-lg"
                        : "border-gray-300 hover:border-purple-500 hover:shadow-md"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-gray-900 mb-1 transition-all text-sm ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p
                      className={`text-sm transition-all ${
                        item.completed ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
