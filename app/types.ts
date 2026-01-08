export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoData {
  todos: Todo[];
  total: number;
  page: number;
  totalPages: number;
  hasMore?: boolean;
  activeCount: number;
  completedCount: number;
}

export interface StatusCardProps {
  todoData: TodoData;
}

export interface TodoProps {
  todoData: TodoData;
  user: {
    name: string;
    image: string;
    email: string;
  };
}

export interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setOpen: (open: boolean) => void;
  filter: "all" | "active" | "completed";
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export interface TodoListProps {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isPending: boolean;
}
