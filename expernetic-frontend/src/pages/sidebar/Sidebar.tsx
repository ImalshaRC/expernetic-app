import { Outlet } from "react-router-dom";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div style={{ marginTop: "55px" }}>
      <div className="sidebar">
        <NavLink className="nav-side" to={"/add"}>
          Add Todo
        </NavLink>
        <NavLink className="nav-side" to={"/list"}>
          List Todo
        </NavLink>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
