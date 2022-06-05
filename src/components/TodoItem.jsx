import { format } from "date-fns";
import React from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";

const TodoItem = ({ todo }) => {
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
        <div className={styles.icon}>
          <MdDelete />
        </div>
        <div className={styles.icon}>
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
