import { ObjectId } from 'mongodb';

export interface Todo {
  _id?: ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}
