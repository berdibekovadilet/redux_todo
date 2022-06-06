import { format } from "date-fns";
import React, { useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo deleted successfully");
  };

  const handleUpdate = (id) => {
    setUpdateModal(true);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          []
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "h:mm, dd.MM.yy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModal}
        setModalOpen={setUpdateModal}
      ></TodoModal>
    </>
  );
};

export default TodoItem;
