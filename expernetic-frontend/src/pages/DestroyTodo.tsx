import { redirect } from "react-router-dom";
import { deleteTodoById } from "../services/TodoService";

export async function DestroyTodo(params: any) {
  await deleteTodoById(params.id);
  return redirect("/");
}
