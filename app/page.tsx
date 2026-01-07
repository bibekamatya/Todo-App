import { getTodos } from "@/app/actions/todoActions";
import TodoList from "@/components/TodoList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const todos = await getTodos();

  return <TodoList initialTodos={todos} user={session.user} />;
}
