import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";

function SideBar({
  onAddClick,
  directories,
  onNewDirectory,
  onDeleteDirectory,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="hamburger-btn btn d-md-none"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list"></i>
      </button>
      <div
        className={`sidebar sidebar-body border-end p-3 d-flex flex-column ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        <h5 className="sidebar-title">TO-DO LIST</h5>
        <button
          className="add-task-btn d-block btn-primary mb-4 w-100"
          onClick={onAddClick}
        >
          + Add new task
        </button>
        <div className="sidebar-categories flex-column">
          <Link
            to="/"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            All tasks
          </Link>
          <Link
            to="/important"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            Important tasks
          </Link>
          <Link
            to="/completed"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            Completed tasks
          </Link>
          <Link
            to="/uncompleted"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            Uncompleted tasks
          </Link>
        </div>
        <div className="dropdown mt-3">
          <button
            className="dropdown-btn dropdown-toggle w-100 text-start"
            type="button"
            data-bs-toggle="dropdown"
          >
            Directories
          </button>
          <ul className="dropdown-menu w-100">
            {directories.map((dir, index) => (
              <li key={index} className="directory-item">
                <Link
                  to={`/${dir.toLowerCase()}`}
                  className="directory-name"
                  onClick={() => setIsOpen(false)}
                >
                  {dir}
                </Link>
                <div className="directory-actions">
                  <i className="bi bi-pencil-square me-2" title="Edit"></i>
                  <i
                    className="bi bi-trash"
                    title="Delete"
                    onClick={() => onDeleteDirectory(dir)}
                  ></i>
                </div>
              </li>
            ))}
            <li>
              <button className="new-btn" onClick={onNewDirectory}>
                + New
              </button>
            </li>
          </ul>
        </div>

        {/* 🔐 Auth Buttons */}
        <div className="mt-auto pt-3 border-top">
          <Link to="/signup" className="btn btn-outline-primary mb-2 w-100">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-secondary w-100">
            Log In
          </Link>
        </div>
      </div>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;
