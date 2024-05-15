import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="top-nav">
      <Link className="nav-text-large header" to="/">
        Blog Project
      </Link>
      <ul className="nav-list">
        <li id="sidebar">
          <NavLink to="/">Posts</NavLink>
        </li>
        <li id="sidebar">
          <NavLink to="/users">Users</NavLink>
        </li>
        <li id="sidebar">
          <NavLink to="/todos">Todos</NavLink>
        </li>
      </ul>
    </nav>
  );
}
