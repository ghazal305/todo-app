import React from "react";
import "./style.css";

const CompleteList = ({ completeTasks, onRemoveAll }) => {
  const showCompleted =
    completeTasks.length === 0 ? (
      <div className=" task-item no-tasks">no completed tasks to display</div>
    ) : (
      completeTasks.map((task) => {
        return (
          <div className="complete-task-item" key={task.id}>
            <div>{task.title}</div>
          </div>
        );
      })
    );

  return (
    <div>
      <div>{showCompleted}</div>
    </div>
  );
};

export default CompleteList;
