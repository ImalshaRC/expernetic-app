import { Form, useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodoById } from "../services/TodoService";
import { TodoResponse } from "../types/types";
import { useEffect, useState } from "react";

export default function UpdateTodo() {
  const [todo, setTodo] = useState<TodoResponse | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      getTodoById(id).then((res) => {
        setTodo(res);
      });
    }
  }, [id]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo) {
      const formData = new FormData(event.currentTarget);

      const todoData: TodoResponse = {
        id: todo.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        completed: todo.completed,
      };

      const res = await updateTodoById(todo.id.toString(), todoData);
      if (res?.status === 204) {
        navigate("/list");
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: 140 }}
    >
      <div className="col-md-6 p-3 border rounded">
        <Form method="post" id="login-form" onSubmit={submit}>
          <h2 className="text-center mb-4">Update Todo Item</h2>
          <div className="form-group">
            <label htmlFor="AddTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="AddTitle"
              placeholder="Enter Title"
              name="title"
              defaultValue={todo?.title}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="AddDesc">Description</label>
            <input
              type="text"
              className="form-control"
              id="AddDesc"
              placeholder="Enter Description"
              name="description"
              defaultValue={todo?.description}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Update
          </button>
        </Form>
      </div>
    </div>
  );
}
