import "./App.css";
import { useEffect, useState } from "react";

import { Forms } from "./components/Forms/Forms";
import { ListTasks } from "./components/ListTasks/ListTasks";
import { PopupNotification } from "./components/Popup/PopupNotification/PopupNotification";
import { Popup } from "./components/Popup/EditPopup/Popup";

const STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [popupMessages, setPopupMessages] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (todo) => {
    setTasks([...tasks, todo]);
  };

  const handleClosePopup = (index) => {
    setPopupMessages((prevMessages) =>
      prevMessages.filter((_, i) => i !== index)
    );
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setCurrentTask(taskToEdit);
    setIsPopupOpen(true);
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const doneTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) {
          return task;
        } else {
          return { ...task, done: true };
        }
      })
    );
  };

  return (
    <>
      <div className="App">
        {isPopupOpen ? (
          <Popup
            setIsPopupOpen={setIsPopupOpen}
            currentTask={currentTask}
            setTasks={setTasks}
          />
        ) : null}
        <Forms addNewTask={addNewTask} setPopupMessages={setPopupMessages} />
        <ListTasks
          tasks={tasks}
          removeTask={removeTask}
          doneTask={doneTask}
          editTask={editTask}
        />
      </div>
      {popupMessages.map((message, index) => (
        <PopupNotification
          key={index}
          message={message}
          onClose={() => handleClosePopup(index)}
        />
      ))}
    </>
  );
}

export default App;
