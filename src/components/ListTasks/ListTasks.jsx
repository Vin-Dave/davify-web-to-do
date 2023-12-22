import styles from "./ListTasks.module.css";

import { calculateDaysLeft } from "../../utils/checkDate";

export function ListTasks({ tasks, removeTask, doneTask, editTask }) {
  return (
    <div className={styles.tasks}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task}>
          {console.log(task.id)}
          <span
            className={styles.timeLeft}
          >{`Czas pozostały: ${calculateDaysLeft(task.endDate)} dni`}</span>
          <button onClick={() => editTask(task.id)} className={styles.editBtn}>
            Edit
          </button>
          <div className={styles.taskHeader}>
            <h2>{task.title}</h2>
          </div>

          <p className={styles.description}>{task.description}</p>

          <div className={styles.taskFooter}>
            <button
              disabled={task.done}
              className="list-space task-btn done"
              onClick={() => doneTask(task.id)}
            >
              Done
            </button>
            <button
              className="task-btn remove"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
