export interface ToDo {
  title: string;
  description: string;
  completed: boolean;
}

export interface LoadTodoList {
  todoList: TodoResponse[];
}

export interface LoadTodo {
  todo: ToDo;
}

export interface LoadTodoResponse {
  todo: TodoResponse;
}

export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TodoResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CompletedStatus {
  completed: boolean;
}
