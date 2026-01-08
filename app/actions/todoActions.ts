"use server";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { Todo } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const DB_NAME = "todoapp";
const COLLECTION_NAME = "todos";

export async function getTodos(
  filter?: "all" | "active" | "completed",
  page: number = 1,
  limit: number = 6
) {
  const session = await auth();
  if (!session?.user?.email)
    return {
      todos: [],
      total: 0,
      page: 1,
      totalPages: 0,
      activeCount: 0,
      completedCount: 0,
    };

  const client = await clientPromise;
  const db = client.db(DB_NAME);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { userId: session.user.email };
  if (filter === "active") query.completed = false;
  if (filter === "completed") query.completed = true;

  const skip = (page - 1) * limit;

  const [todos, total, activeCount, completedCount] = await Promise.all([
    db
      .collection<Todo>(COLLECTION_NAME)
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db.collection<Todo>(COLLECTION_NAME).countDocuments(query),
    db
      .collection<Todo>(COLLECTION_NAME)
      .countDocuments({ userId: session.user.email, completed: false }),
    db
      .collection<Todo>(COLLECTION_NAME)
      .countDocuments({ userId: session.user.email, completed: true }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    todos: JSON.parse(JSON.stringify(todos)),
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
    activeCount,
    completedCount,
  };
}

export async function createTodo(title: string, description?: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection<Todo>(COLLECTION_NAME).insertOne({
    title,
    description,
    completed: false,
    createdAt: new Date(),
    userId: session.user.email,
  });
  revalidatePath("/");
  return { success: true, id: result.insertedId.toString() };
}

export async function updateTodoStatus(id: string, completed: boolean) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db
    .collection<Todo>(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id), userId: session.user.email },
      { $set: { completed } }
    );
  revalidatePath("/");
  return { success: true };
}

export async function deleteTodo(id: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection<Todo>(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });
  revalidatePath("/");
  return { success: true };
}

export async function updateTodo(id: string, title: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db
    .collection<Todo>(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id), userId: session.user.email },
      { $set: { title } }
    );
  revalidatePath("/");
  return { success: true };
}
