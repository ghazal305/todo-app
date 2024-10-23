import React, { useState, useRef, useEffect } from "react";
import TaskList from "./TaskList";
import "./style.css";
import CompleteList from "./completeList";

const TaskInput = () => {
  const [valueInput, setValueInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const idNumber = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCompleteTasks =
      JSON.parse(localStorage.getItem("completeTasks")) || [];

    console.log("Loaded Tasks:", storedTasks);
    console.log("Loaded Complete Tasks:", storedCompleteTasks);

    setTasks(storedTasks);
    setCompleteTasks(storedCompleteTasks);

    idNumber.current =
      storedTasks.length > 0 ? storedTasks[storedTasks.length - 1].id + 1 : 1;
  }, []);

  const handleCompleteTask = (id) => {
    const taskComplete = tasks.find((task) => {
      return task.id === id;
    });

    if (taskComplete) {
      setCompleteTasks((prevCompleteTasks) => {
        const updatedCompleteTasks = [...prevCompleteTasks, taskComplete];
        localStorage.setItem(
          "completeTasks",
          JSON.stringify(updatedCompleteTasks)
        );
        console.log("updatedCompleteTasks", updatedCompleteTasks);
        return updatedCompleteTasks;
      });
      handleDeleteTask(id);
    }
  };
  const handleRemoveAll = () => {
    setCompleteTasks([]);
  };
  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (!valueInput.trim()) return;
    if (!isNaN(valueInput)) {
      alert("Please enter text, not a number");
      return;
    }
    const newTask = { id: idNumber.current, title: valueInput };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log("Updated Tasks in localStorage:", updatedTasks);
      return updatedTasks;
    });

    idNumber.current += 1;
    setValueInput("");
  };
  return (
    <div>
      <div className="header-container">
        <div>
          <h2>Tasks List</h2>
        </div>

        <div>
          <h2>Complete List</h2>
        </div>
      </div>

      <div className="lists-container">
        <div className="container_tasks-list">
          <div>
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          </div>
        </div>
        <div className="container_tasks-complete-list">
          <div>
            <CompleteList
              completeTasks={completeTasks}
              onRemoveAll={handleRemoveAll}
            />
          </div>
        </div>
      </div>
      <div className="task-input-container">
        <div>
          <div>
            <input
              placeholder="enter the task"
              className="input-field"
              type="text"
              value={valueInput}
              onChange={(event) => {
                setValueInput(event.target.value);
              }}
            />
          </div>
          <div>
            <button className="add-button" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </div>

        <div>
          <div>
            <button
              className="remove-button"
              onClick={handleRemoveAll}
              disabled={completeTasks.length === 0}
            >
              remove all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
