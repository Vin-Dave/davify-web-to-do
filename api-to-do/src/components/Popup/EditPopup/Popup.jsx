import { useEffect, useState } from "react";

import styles from "../EditPopup/Popup.module.css";
import { getTodayDate } from "../../../utils/checkDate";

export const Popup = ({ currentTask, setTasks, setIsPopupOpen }) => {
  const [editedTask, setEditedTask] = useState({ ...currentTask });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    const newValue = type === "checkbox" ? checked : value;

    setEditedTask((prevTask) => ({ ...prevTask, [name]: newValue }));
  };

  useEffect(() => {
    setEditedTask({ ...currentTask });
  }, [currentTask]);

  const handleSaveButton = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editedTask.id ? { ...editedTask } : task
      )
    );

    setIsPopupOpen(false);
  };
  const chceckInputData = (e) => {
    if (e.target.value >= getTodayDate()) {
      setEditedTask((prevTask) => ({ ...prevTask, endDate: e.target.value }));
    } else {
      alert("Can't add a task with a date later than the current date ");
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.popupOverlay}>
        <div className={styles.popup}>
          <span className={styles.exit} onClick={() => setIsPopupOpen(false)}>
            X
          </span>
          <h2>Edit Task</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endDate"
            value={editedTask.endDate || ""}
            onChange={chceckInputData}
          />
          <div>
            <label htmlFor="doneCheckbox">Mark as complet</label>
            <input
              type="checkbox"
              name="done"
              checked={editedTask.done}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={handleSaveButton} className={styles.save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
