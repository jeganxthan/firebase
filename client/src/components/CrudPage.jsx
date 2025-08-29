import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function CrudPage() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState(0);
  const [isCompeleted, setIsCompleted] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const taskCollectionRef = collection(db, "crud");

  const getTaskList = async () => {
    try {
      const data = await getDocs(taskCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTaskList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitTask = async () => {
    try {
      await addDoc(taskCollectionRef, {
        title: newTask,
        date: date,
        completed: isCompeleted,
      });
      setNewTask("");
      setDate(0);
      setIsCompleted(false);
      getTaskList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskDoc = doc(db, "crud", id);
      await deleteDoc(taskDoc);
      getTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskTitle = async (id) => {
    try {
      const taskDoc = doc(db, "crud", id);
      await updateDoc(taskDoc, { title: updatedTitle });
      setUpdatedTitle("");
      getTaskList();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">📝 Task Manager</h1>

      {/* Task input form */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a new task</h2>
        <div className="flex flex-col gap-3">
          <input
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            placeholder="Date (YYYYMMDD)..."
            value={date || ""}
            onChange={(e) => setDate(Number(e.target.value))}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCompeleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Completed</span>
          </label>
          <button
            onClick={onSubmitTask}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="w-full max-w-2xl space-y-4">
        {taskList.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? "text-green-600" : "text-red-500"
                }`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-gray-500">Date: {task.date}</p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Update title"
                className="border rounded-lg px-2 py-1 text-sm"
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
                onClick={() => updateTaskTitle(task.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
              >
                Update
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-10 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
