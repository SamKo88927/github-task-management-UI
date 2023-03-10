import React, { useState } from 'react'
import "./task.scss"
import { motion } from "framer-motion";
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
interface props {
  title: string,
  body: string,
  state: string,
  userAvatar:string,
  handleEdit: () => void;
  handleDelete: () => void;
}
const Task = ({ title, body, state,userAvatar, handleEdit, handleDelete }: props) => {
  const [openSettings, setOpenSettings] = useState(false)
  const handleClick = () => {
    setOpenSettings(!openSettings)
    if (openSettings == true) {
      setOpenSettings(!openSettings)
    }
  }
  return (
    <div className="task-container">
      <div className="task-header">
        <img src={userAvatar} alt="" />
        <h3 className="task-title">{title}</h3>
        <p className="task-status">{state}</p>
        <div className="task-actions">
          <IconButton aria-label="Example" onClick={handleClick}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
          {
            openSettings &&
            <motion.div
              className="popup-setting"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <button className="edit-button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
                edit
              </button>
              <button className="delete-button" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
                delete
              </button>
            </motion.div>}
        </div>
      </div>
      <p className="task-body">{body}</p>
    </div>
  );
};

export default Task