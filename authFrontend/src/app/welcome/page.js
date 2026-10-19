
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/lib/api";

export default function WelcomePage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getToken = () => localStorage.getItem("nexus_token");

  const apiRequest = async (path, options = {}) => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      throw new Error("Please log in to manage your tasks.");
    }

    const response = await fetch(`${API_URL}/tasks${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  };

  const fetchTasks = async () => {
    try {
      setError("");
      const data = await apiRequest("");
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (!localStorage.getItem("nexus_token")) {
    router.replace("/login");
    return;
  }

  fetchTasks();
}, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingId) {
        await apiRequest(`/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
          }),
        });
        setMessage("Task updated successfully.");
      } else {
        await apiRequest("", {
          method: "POST",
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
          }),
        });
        setMessage("Task added successfully.");
      }

      resetForm();
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRead = async (task) => {
    setSelectedTask(task);
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setSelectedTask(null);
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setError("");
      setMessage("");
      await apiRequest(`/${id}`, { method: "DELETE" });
      setTasks((current) => current.filter((task) => task._id !== id));
      if (selectedTask?._id === id) setSelectedTask(null);
      if (editingId === id) resetForm();
      setMessage("Task deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      setError("");
      await apiRequest(`/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !task.completed }),
      });
      await fetchTasks();
      setMessage("Task status updated.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("nexus_token");
  router.replace("/login");
};  

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="mt-1 text-slate-500">
              Create, view, edit, and manage your tasks.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-50"
          >
            Logout
          </button>
        </header>

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            {editingId ? "Edit Task" : "Add New Task"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-1 block font-medium">
                Task Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Task"
                    : "Add Task"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
            {message}
          </p>
        )}

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Task List</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {loading ? (
            <p className="py-8 text-center text-slate-500">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              No tasks yet. Add your first task above.
            </p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <article
                  key={task._id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`break-words text-lg font-semibold ${
                          task.completed
                            ? "text-slate-400 line-through"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="mt-1 whitespace-pre-wrap break-words text-slate-600">
                        {task.description || "No description provided."}
                      </p>
                      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={Boolean(task.completed)}
                          onChange={() => handleToggleCompleted(task)}
                          className="h-4 w-4"
                        />
                        {task.completed ? "Completed" : "Mark as completed"}
                      </label>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleRead(task)}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {selectedTask && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedTask(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="task-details-title"
              className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="task-details-title" className="text-xl font-bold">
                Task Details
              </h2>
              <p className="mt-4 font-semibold">{selectedTask.title}</p>
              <p className="mt-2 whitespace-pre-wrap text-slate-600">
                {selectedTask.description || "No description provided."}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Status: {selectedTask.completed ? "Completed" : "Pending"}
              </p>
              <button
                onClick={() => setSelectedTask(null)}
                className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
              >
                Close
              </button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
