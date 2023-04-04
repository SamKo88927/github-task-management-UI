import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import "./task.scss"
import { motion } from "framer-motion";
import { Button, IconButton } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PopUpLabels from './PopUpLabels';
import { BsPencilSquare } from 'react-icons/bs';
import { FaEllipsisV, FaTrashAlt} from 'react-icons/fa';
interface props {
  number: number,
  title: string,
  body: string,
  state: string,
  userAvatar: string,
  labels: string,
  repository_url: string,
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme) => ({
  taskStatus: {
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "0.5px solid #a1a1a169",
    "&.In_Progress": {
      color: "#f00",
    },
    "&.Done": {
      color: "#0f0",
    },
  },
}));


const Task = ({ setRefetchData, repository_url, number, title, body, state, labels, userAvatar }: props) => {
  const [openSettings, setOpenSettings] = useState(false)
  const [openState, setOpenState] = useState(false)
  const classes = useStyles();
  const navigate = useNavigate();
  const issueUrl = useMemo(() => {
    return repository_url?.split("/repos/")[1]
  }, [repository_url]);
  const ownRepo = issueUrl?.split("/issues")[0]
  const handleDelete = async () => {
    const res = await axios.post('/auth/github/issue/deleted', {
      own: "SamKo88927",
      repo: "github-task-management-UI",
      number: number
    }
      , {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
          'Content-Type': 'application/json'
        }
      });
      setRefetchData(item => !item)
    setOpenSettings(false)
  };
  
  const handleClick = () => {
    setOpenSettings(!openSettings)
  }
  const handleState = () => {
    setOpenState(!openState)
  }
  const handleEdit = () => {
    navigate(`${number}`, { state: { issueUrl } })
  }
  return (
    <div className="task-container">
      <div className="task-header">
        <Button className={`${classes.taskStatus} ${!labels ? state : labels.replace(" ", "_")}`} variant="outlined"
          onClick={handleState}>
          {!labels ? state : labels}
        </Button>
        {
          openState &&
          <PopUpLabels 
          issueUrl={issueUrl}
          setRefetchData={setRefetchData}
          setOpenState={setOpenState}
          />
          }
        <div className="task-actions">
          <IconButton onClick={handleClick}>
            <FaEllipsisV/>
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
              <BsPencilSquare />
                edit
              </button>
              <button className="delete-button" onClick={handleDelete}>
         <FaTrashAlt/>
                delete
              </button>
            </motion.div>}
        </div>
      </div>
      <div className="task-header">
        <img src={userAvatar} alt="" />
        <h3 className="task-title">{title}</h3>
      </div>
      <p className="task-body">{body}</p>
      <div className="task-bottom">
        <CardMembershipIcon />
        {ownRepo}</div>

    </div>
  );
};

export default React.memo(Task);