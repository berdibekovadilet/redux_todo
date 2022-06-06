import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { addTodo, updateTodo } from "../slices/todoSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuidv4(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully");
        setModalOpen(false);
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
        } else {
          toast.error("No changes were made");
        }
      }
    } else {
      toast.error("Title shouldn't be empty");
    }
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose></MdOutlineClose>
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === "update" ? "Update" : "Add"} TODO
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === "update" ? "Update" : "Add"} Task
              </Button>
              <Button
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TodoModal;
