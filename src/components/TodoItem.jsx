import { format } from "date-fns";
import React from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo(todo.id));
  };

  const handleUpdate = (id) => {
    console.log("updating");
  };

  return (
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
          onClick={() => handleDelete()}
          onKeyDown={() => handleDelete()}
          tabIndex={0}
          role="button"
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          onClick={() => handleUpdate()}
          onKeyDown={() => handleUpdate()}
          tabIndex={0}
          role="button"
        >
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
