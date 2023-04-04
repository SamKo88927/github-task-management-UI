import React, { Dispatch, SetStateAction } from 'react'
import { motion } from "framer-motion";
import "./popUpLabels.scss"
import axios from 'axios';
interface PopUpLabelsProps {
  issueUrl:string,
  setRefetchData:  Dispatch<SetStateAction<boolean>>,
  setOpenState:  Dispatch<SetStateAction<boolean>>,
  }

const PopUpLabels = ({issueUrl,setRefetchData,setOpenState}:PopUpLabelsProps) => {
  const handleChangeState = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/auth/github/issue/updated?url='+issueUrl, {
      labels: [e.currentTarget.value],
    }
      , {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
          'Content-Type': 'application/json'
        }
      });
    setRefetchData((item: any)=>!item)
    setOpenState(false)
  }
  return (
        <motion.div
        className="popup-state"
        id="labels"
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }} 
        transition={{
            type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
          >
            <button  value="Open" className="Open" onClick={handleChangeState}>
              <div className="sq open" />
              Open
            </button>
            <button   value="In Progress" className="progress" onClick={handleChangeState}>
              <div className="sq progress" />
              In Progress
            </button>
            <button  value="Done" className="done" onClick={handleChangeState} >
              <div className="sq done" />
              Done
            </button>
          </motion.div>
  )
}

export default PopUpLabels