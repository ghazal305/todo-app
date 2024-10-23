import React from "react";
import "./style.css";

const TaskList = ({ tasks, onDelete, onComplete }) => {
  const tasksList =
    tasks.length === 0 ? (
      <div className="task-item no-tasks">
        Sorry, there are no tasks to display
      </div>
    ) : (
      tasks.map((task) => {
        return (
          <div className="task-item" key={task.id}>
            <div className="task">{task.title}</div>
            <div>
              <button
                onClick={() => {
                  onDelete(task.id);
                }}
                className="delete-button"
              >
                delete
              </button>
            </div>
            <div>
              <button
                className="complete-button"
                onClick={() => {
                  onComplete(task.id);
                }}
              >
                complete
              </button>
            </div>
          </div>
        );
      })
    );

  return <div className="task-list">{tasksList}</div>;
};

export default TaskList;
