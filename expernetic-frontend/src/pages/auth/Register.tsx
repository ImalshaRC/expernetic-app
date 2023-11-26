import { Form, redirect } from "react-router-dom";
import { RegisterRequest } from "../../services/AuthService";
import { User } from "../../types/types";
import { toast } from "react-toastify";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const registerData: User = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await RegisterRequest(registerData);
  if (res) {
    toast.info(res);
    return redirect("/login");
  }
  return null;
}

export default function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 p-3 border rounded">
        <Form method="post" id="Register-form">
          <h2 className="text-center mb-4">Sign Up</h2>

          <div className="form-group">
            <label htmlFor="forEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="forEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="fullName"
              placeholder="Enter Name"
              name="fullName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="forPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="forPassword"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sign Up
          </button>
        </Form>
      </div>
    </div>
  );
}
