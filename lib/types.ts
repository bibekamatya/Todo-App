import { ObjectId } from 'mongodb';

export interface Todo {
  _id?: ObjectId;
  title: string;
  completed: boolean;
  createdAt: Date;
}
