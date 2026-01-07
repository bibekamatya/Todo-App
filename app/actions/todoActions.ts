'use server';

import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Todo } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const DB_NAME = 'todoapp';
const COLLECTION_NAME = 'todos';

export async function getTodos() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const todos = await db.collection<Todo>(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return JSON.parse(JSON.stringify(todos));
}

export async function createTodo(title: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection<Todo>(COLLECTION_NAME).insertOne({
    title,
    completed: false,
    createdAt: new Date(),
  });
  revalidatePath('/');
  return { success: true, id: result.insertedId.toString() };
}

export async function updateTodo(id: string, completed: boolean) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection<Todo>(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed } }
  );
  revalidatePath('/');
  return { success: true };
}

export async function deleteTodo(id: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection<Todo>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/');
  return { success: true };
}

export async function updateTodoTitle(id: string, title: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection<Todo>(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(id) },
    { $set: { title } }
  );
  revalidatePath('/');
  return { success: true };
}
