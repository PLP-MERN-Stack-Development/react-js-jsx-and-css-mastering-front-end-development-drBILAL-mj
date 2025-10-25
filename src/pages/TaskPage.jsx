// src/pages/TasksPage.jsx
import React from "react";
import TaskManager from "./TaskManager";

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskManager />
    </div>
  );
}
