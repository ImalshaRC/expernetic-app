import { useLoaderData, useRevalidator } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  deleteTodoById,
  getTodoList,
  updateCompletedById,
} from "../services/TodoService";
import { LoadTodoList } from "../types/types";

export async function loader() {
  const todoList = await getTodoList();
  return { todoList };
}

export default function ListTodo() {
  const { todoList } = useLoaderData() as LoadTodoList;
  const reValidator = useRevalidator();

  const updateCompleted = (id: number, completed: boolean) => {
    updateCompletedById(id, completed).then((res) => {
      if (res?.status === 204) {
        reValidator.revalidate();
      }
    });
  };

  const deleteTodo = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    const val = confirm(
      "Are you sure you want to delete this traveler account?"
    );
    if (val) {
      deleteTodoById(id).then((res) => {
        if (res?.status === 204) {
          reValidator.revalidate();
        }
      });
    }
  };

  return (
    <>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Completed</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {todoList && todoList.length ? (
            <tbody>
              {todoList.map((todo, index) => (
                <tr key={index}>
                  <td>{todo?.title}</td>
                  <td>{todo?.description}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        defaultChecked={todo.completed}
                        onChange={() =>
                          updateCompleted(todo.id, todo.completed)
                        }
                      />
                    </div>
                  </td>
                  <td style={{ display: "flex" }}>
                    <Link to={`/edit/${todo.id}`}>
                      <button className="btn btn-info">Update</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: 5 }}
                      type="submit"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td>
                  <i>No Todos Available</i>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
