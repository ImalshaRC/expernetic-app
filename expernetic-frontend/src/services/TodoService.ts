import axios from "../api/axios";
import { CompletedStatus, ToDo, TodoResponse } from "../types/types";
import { getAuthToken } from "./AuthService";

const TODO_URL = "/Todo";

export async function addTodo(todoData: ToDo) {
  try {
    const response = await axios.post(TODO_URL, JSON.stringify(todoData), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function getTodoList() {
  try {
    const response = await axios.get(TODO_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function getTodoById(id: string) {
  try {
    const response = await axios.get(`${TODO_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function deleteTodoById(id: number) {
  try {
    const response = await axios.delete(`${TODO_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function updateCompletedById(
  id: number,
  completedStatus: boolean
) {
  const completedData: CompletedStatus = {
    completed: !completedStatus,
  };

  try {
    const response = await axios.patch(
      `${TODO_URL}/${id}`,
      JSON.stringify(completedData),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function updateTodoById(id: string, todoRes: TodoResponse) {
  try {
    const response = await axios.put(
      `${TODO_URL}/${id}`,
      JSON.stringify(todoRes),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}
