import { Form, useNavigate } from "react-router-dom";
import { LoginRequest } from "../../services/AuthService";
import { LoginData } from "../../types/types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginData: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await LoginRequest(loginData);

      if (res?.status === 200) {
        toast.info("Login Successful");
        login();
        navigate("/list");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 p-3 border rounded">
        <Form method="post" id="login-form" onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Sign In</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Sign In
            </button>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
