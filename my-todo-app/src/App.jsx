import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import TaskBoard from "./components/TaskBoard";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import NewDirectoryModal from "./components/NewDirectoryModal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Do something",
      date: "2025-07-10",
      completed: false,
      important: true,
      directory: "Main",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Buy milk",
      date: "2025-07-11",
      completed: true,
      important: false,
      directory: "Main",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Homework",
      date: "2025-07-12",
      completed: false,
      important: false,
      directory: "Secondary",
    },
  ]);

  const [directories, setDirectories] = useState(["Main", "Secondary"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showNewDirModal, setShowNewDirModal] = useState(false);

  const handleAddTask = (task) => setTasks((prev) => [task, ...prev]);

  const handleEditTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleToggleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleCreateDirectory = (newTitle) => {
    setDirectories((prev) => [...prev, newTitle]);
  };

  const handleDeleteDirectory = (dirName) => {
    setDirectories((prev) => prev.filter((dir) => dir !== dirName));
    setTasks((prev) => prev.filter((task) => task.directory !== dirName));
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="d-flex" style={{ height: "100vh" }}>
        <SideBar
          onAddClick={() => setShowAddModal(true)}
          directories={directories}
          onNewDirectory={() => setShowNewDirModal(true)}
          onDeleteDirectory={handleDeleteDirectory}
        />
        <div
          className="flex-grow-1 overflow-auto"
          style={{ backgroundColor: "#dee6ed" }}
        >
          <Routes>
            {/* 🔐 Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* 🗂️ Task Routes */}
            <Route
              path="/"
              element={
                <TaskBoard
                  tasks={tasks}
                  filter="all"
                  onAddClick={() => setShowAddModal(true)}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleImportant={handleToggleImportant}
                  onEditClick={handleEditClick}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
            <Route
              path="/important"
              element={
                <TaskBoard
                  tasks={tasks}
                  filter="important"
                  onAddClick={() => setShowAddModal(true)}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleImportant={handleToggleImportant}
                  onEditClick={handleEditClick}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
            <Route
              path="/completed"
              element={
                <TaskBoard
                  tasks={tasks}
                  filter="completed"
                  onAddClick={() => setShowAddModal(true)}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleImportant={handleToggleImportant}
                  onEditClick={handleEditClick}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
            <Route
              path="/uncompleted"
              element={
                <TaskBoard
                  tasks={tasks}
                  filter="uncompleted"
                  onAddClick={() => setShowAddModal(true)}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleImportant={handleToggleImportant}
                  onEditClick={handleEditClick}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
            {directories.map((dir, i) => (
              <Route
                key={i}
                path={`/${dir.toLowerCase()}`}
                element={
                  <TaskBoard
                    tasks={tasks.filter(
                      (task) =>
                        task.directory.toLowerCase() === dir.toLowerCase()
                    )}
                    filter="directory"
                    onAddClick={() => setShowAddModal(true)}
                    onToggleCompleted={handleToggleCompleted}
                    onToggleImportant={handleToggleImportant}
                    onEditClick={handleEditClick}
                    onDeleteTask={handleDeleteTask}
                  />
                }
              />
            ))}
          </Routes>
        </div>
        <AddTaskModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTask}
          directories={directories}
        />
        <EditTaskModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          task={editingTask}
          onEdit={handleEditTask}
          directories={directories}
        />
        <NewDirectoryModal
          show={showNewDirModal}
          onClose={() => setShowNewDirModal(false)}
          onCreate={handleCreateDirectory}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
