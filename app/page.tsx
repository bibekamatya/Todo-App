import { getTodos } from "@/app/actions/todoActions";
import TodoList from "@/components/Todo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const todoData = await getTodos();
  return (
    <TodoList
      todoData={todoData}
      user={{
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      }}
    />
  );
}
