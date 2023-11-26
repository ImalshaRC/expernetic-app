import { Form, redirect } from "react-router-dom";
import { addTodo } from "../services/TodoService";
import { ToDo } from "../types/types";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const todoData: ToDo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    completed: false,
  };

  const res = await addTodo(todoData);
  if (res) {
    return redirect("/list");
  }
  return null;
}

export default function AddTodo() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: 140 }}
    >
      <div className="col-md-6 p-3 border rounded">
        <Form method="post" id="login-form">
          <h2 className="text-center mb-4">Add Todo Item</h2>
          <div className="form-group">
            <label htmlFor="AddTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="AddTitle"
              placeholder="Enter Title"
              name="title"
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
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
