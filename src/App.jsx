import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const initialTasks = [
  {
    id: 1,
    header: "Complete React Assignment",
    description: "Build the Task Manager application using React.",
    priority: "High",
    category: "Academic",
    raised: "12 Sep 2026, 10:30 AM",
    due: "28 Aug 2026",
    status: "Pending"
  }
];

function Layout({ children }) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <div>
            <h2>TaskFlow</h2>
            <span>Task Manager</span>
          </div>
        </div>

        <div className="menu-title">MENU</div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <span>⌂</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <span>☷</span>
            My Tasks
          </NavLink>

          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <span>＋</span>
            Add Task
          </NavLink>

          <NavLink
            to="/completed"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <span>✓</span>
            Completed
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="menu-title">ACCOUNT</div>

          <Logout />
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">S</div>
          <div>
            <strong>Student</strong>
            <small>Personal Workspace</small>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">My Workspace</span>

          <div className="topbar-right">
            <button className="notification">🔔</button>

            <div className="profile">
              <div className="profile-avatar">S</div>
              <div>
                <strong>Student</strong>
                <small>Online</small>
              </div>
            </div>
          </div>
        </header>

        <main className="content">{children}</main>

        <footer>TaskFlow • Smart Task Management</footer>
      </div>
    </div>
  );
}

function Dashboard({ tasks }) {
  const total = tasks.length;

  const pending = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const completed = tasks.filter(
    task => task.status === "Closed"
  ).length;

  return (
    <Layout>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Good morning! 👋</h1>
          <p className="welcome-text">
            Here's what's happening with your tasks today.
          </p>
        </div>

        <Link to="/add-task" className="new-task-btn">
          ＋ New Task
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">☷</div>
          <div>
            <span>Total Tasks</span>
            <strong>{total}</strong>
          </div>
          <small>All tasks</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
          <small>Need attention</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
          <small>Finished tasks</small>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR WORK</p>
          <h2>Recent Tasks</h2>
        </div>

        <Link to="/tasks" className="view-all">
          View all →
        </Link>
      </div>

      <div className="recent-task-card">
        {tasks.slice(0, 3).map(task => (
          <div className="recent-task" key={task.id}>
            <div className="task-check">
              {task.status === "Closed" ? "✓" : ""}
            </div>

            <div className="recent-task-info">
              <h3>{task.header}</h3>
              <p>
                {task.category} • Due {task.due}
              </p>
            </div>

            <span
              className={`status-badge ${
                task.status === "Closed"
                  ? "status-completed"
                  : "status-pending"
              }`}
            >
              {task.status === "Closed"
                ? "Completed"
                : "Pending"}
            </span>

            <span
              className={`priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>

      <div className="productivity-box">
        <div className="productivity-icon">🚀</div>

        <div>
          <h2>Stay productive!</h2>
          <p>
            Create tasks, set priorities and keep track
            of your progress.
          </p>
        </div>

        <Link to="/add-task" className="small-btn">
          Create Task
        </Link>
      </div>
    </Layout>
  );
}

function Tasks({ tasks, setTasks }) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? tasks
      : tasks.filter(task => task.status === filter);

  const completeTask = id => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, status: "Closed" }
          : task
      )
    );
  };

  const deleteTask = id => {
    setTasks(
      tasks.filter(task => task.id !== id)
    );
  };

  return (
    <Layout>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGE YOUR WORK</p>
          <h1>My Tasks</h1>
          <p>
            Keep track of everything you need to complete.
          </p>
        </div>

        <Link to="/add-task" className="new-task-btn">
          ＋ Add Task
        </Link>
      </div>

      <div className="filters">
        {["All", "Pending", "Closed"].map(item => (
          <button
            key={item}
            className={
              filter === item
                ? "filter-btn active-filter"
                : "filter-btn"
            }
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✓</div>
            <h2>No tasks found</h2>
            <p>There are no tasks in this category.</p>
          </div>
        ) : (
          filtered.map(task => (
            <div
              className="modern-task-card"
              key={task.id}
            >
              <div className="task-main">
                <div className="task-title-row">
                  <h3>{task.header}</h3>

                  <span
                    className={`priority ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p>{task.description}</p>

                <div className="task-meta">
                  <span>📚 {task.category}</span>
                  <span>📅 {task.due}</span>
                  <span>● {task.status}</span>
                </div>
              </div>

              <div className="task-actions">
                <Link
                  to={`/tasks/${task.id}`}
                  className="view-btn"
                >
                  View
                </Link>

                {task.status !== "Closed" && (
                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTask(task.id)
                    }
                  >
                    ✓ Complete
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

function AddTask({ tasks, setTasks }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    header: "",
    description: "",
    priority: "Medium",
    category: "Academic",
    due: "28 Aug 2026"
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      ...form,
      raised: new Date().toLocaleString(),
      status: "Pending"
    };

    setTasks([...tasks, newTask]);
    navigate("/tasks");
  };

  return (
    <Layout>
      <div className="form-wrapper">
        <div className="form-header">
          <p className="eyebrow">CREATE NEW</p>
          <h1>Add New Task</h1>
          <p>
            Add a new task and keep your work organized.
          </p>
        </div>

        <form
          className="modern-form"
          onSubmit={handleSubmit}
        >
          <label>Task Title</label>

          <input
            name="header"
            value={form.header}
            onChange={handleChange}
            placeholder="e.g. Complete React Assignment"
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe what you need to do..."
            required
          />

          <div className="form-row">
            <div>
              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Academic</option>
                <option>Personal</option>
              </select>
            </div>
          </div>

          <label>Due Date</label>

          <input
            value={form.due}
            readOnly
          />

          <button
            className="submit-btn"
            type="submit"
          >
            Create Task ✓
          </button>
        </form>
      </div>
    </Layout>
  );
}

function TaskDetails({ tasks }) {
  const { id } = useParams();

  const task = tasks.find(
    t => t.id.toString() === id
  );

  if (!task) {
    return (
      <Layout>
        <div className="empty">
          <h2>Task not found</h2>
          <Link to="/tasks">
            ← Back to Tasks
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="details-wrapper">
        <p className="eyebrow">TASK DETAILS</p>

        <h1>{task.header}</h1>

        <p className="details-description">
          {task.description}
        </p>

        <div className="details-grid">
          <div>
            <span>Priority</span>
            <strong>{task.priority}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{task.category}</strong>
          </div>

          <div>
            <span>Raised Date</span>
            <strong>{task.raised}</strong>
          </div>

          <div>
            <span>Due Date</span>
            <strong>{task.due}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{task.status}</strong>
          </div>
        </div>

        <Link
          className="new-task-btn"
          to="/tasks"
        >
          ← Back to Tasks
        </Link>
      </div>
    </Layout>
  );
}

function Completed({ tasks }) {
  const completed = tasks.filter(
    task => task.status === "Closed"
  );

  return (
    <Layout>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR PROGRESS</p>
          <h1>Completed Tasks 🎉</h1>
          <p>
            Everything you've successfully finished.
          </p>
        </div>
      </div>

      {completed.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">✓</div>
          <h2>No completed tasks yet</h2>
          <p>
            Complete a task and it will appear here.
          </p>
        </div>
      ) : (
        <div className="task-list">
          {completed.map(task => (
            <div
              className="modern-task-card completed-card"
              key={task.id}
            >
              <div className="task-main">
                <div className="task-title-row">
                  <h3>✓ {task.header}</h3>

                  <span className="status-badge status-completed">
                    Completed
                  </span>
                </div>

                <p>{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks
                tasks={tasks}
                setTasks={setTasks}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask
                tasks={tasks}
                setTasks={setTasks}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails tasks={tasks} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <Completed tasks={tasks} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;