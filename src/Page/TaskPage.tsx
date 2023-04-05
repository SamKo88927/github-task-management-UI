import React, { useEffect, useState } from 'react'
import "./taskpage.scss"
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SettingsIcon from '@mui/icons-material/Settings';
import { BsPencilSquare } from "react-icons/bs";
import { Button,  OutlinedInput} from '@material-ui/core';
import PopUpLabels from '../component/PopUpLabels';
import useFetch from '../hooks/useFetch';
import { format, parseISO } from 'date-fns'

const TaskPage = () => {
  const issueUrl = useLocation().state.issueUrl
  const [tasks, setTasks] = useState<any>([]);
  const { data, loading, setRefetchData } = useFetch(`/auth/github/find/issue?url=` + issueUrl)
  useEffect(() => {
    const getTasks = () => {
      setTasks(data)
    }
    getTasks();
  }, [data]);
  const [openEdit, setOpenEdit] = useState(false)
  const [openEditTitle, setOpenEditTitle] = useState(false)
  const [openEditAssigned, setOpenEditAssigned] = useState(false)
  // const [openEditLabels, setOpenEditLabels] = useState(false)
  const [content, setContent] = useState({
    title: "",
    body: "",
    assignees: ["SamKo88927"]
  });
  const [errorMassage, setErrorMassage] = useState("")
  const handleSave = async (e: { currentTarget: { id: any; value: any; }; }) => {
    try {//這邊設置try&catch是為了配合api的 body輸入限制 至少要大於30不然會回報錯誤
      const res = await axios.post(`/auth/github/issue/updated?url=` + issueUrl, {
        [e.currentTarget.id]: e.currentTarget.value
      }
        , {
          headers: {
            'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
            'Content-Type': 'application/json'
          }
        });
      setRefetchData(item => !item)
      setOpenEditTitle(false)
      setOpenEdit(false)
      setErrorMassage("")
    } catch (error: any) {
      setErrorMassage(error?.response.data.message)
    }
  }
  const changeTaskBody = (e: { target: { id: any; value: any; } }) => {
    setContent(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleEditTitle = () => {
    setOpenEditTitle(!openEditTitle)
  }
  const handleEditAssigned = () => {
    setOpenEditAssigned(!openEditAssigned)
  }
  const handleEditLabels = () => {
    setOpenState(!openState)
  }
  const handleEdit = () => {
    setOpenEdit(!openEdit)
  }

  const [openState, setOpenState] = useState(false)
  const name = tasks?.labels?.[0]?.name.replace("In Progress", "progress").toLowerCase()
  return (
    <div className='taskpage'>
      <div className="container">
        <div className='taskpage-title'>
          <div className="taskpage-title-container">
            {
              !openEditTitle ?
                <span className="title">
                  {tasks?.title}
                </span>
                :
                <>
                  <OutlinedInput
                    id="title"
                    placeholder='Title name'
                    defaultValue={tasks?.title}
                    onChange={changeTaskBody}
                  />
                  <Button
                    value={content.title}
                    id="title"
                    style={{ backgroundColor: 'green' }}
                    onClick={handleSave}>Save</Button>
                  <Button variant="outlined" onClick={handleEditTitle}>Cancel</Button>
                </>
            }
            <span className="number"> #{tasks?.number}</span>
            {!openEditTitle &&
              <SettingsIcon onClick={handleEditTitle} />
            }
          </div>
          <div className="user">opened by @{tasks?.user?.login}</div>
        </div>

        <div className="taskpage-info">
          <div className="assignee">
            {/* <img src="https://avatars.githubusercontent.com/u/12345" alt="Avatar of Jane Smith"> */}
            Assigned to @{tasks?.assignee?.login}
          </div>
          <SettingsIcon onClick={handleEditAssigned} />
        </div>
        <div className="taskpage-info">
          <div className="labels">
            <span className={`state ${name || "open"}`}>{tasks?.labels?.[0]?.name ? tasks?.labels?.[0].name : tasks?.state}</span>
          </div>
          {
            openState &&
            <PopUpLabels
              issueUrl={issueUrl}
              setRefetchData={setRefetchData}
              setOpenState={setOpenState}
            />
          }
          <SettingsIcon onClick={handleEditLabels} />
        </div>
        <div className="taskpage-body">
          <div className="body-container">
            {
              openEdit ?
                <textarea
                  defaultValue={tasks?.body}
                  className="body" id="body"
                  placeholder='leave a comment'
                  minLength={30} // 設置最小字元數為 30
                  required // 設置必填欄位
                  onChange={changeTaskBody}
                />
                :
                <>
                  <div className="left">
                    <p>{tasks?.body}</p>
                  </div>
                  <div className="right">
                    <button className="edit-button" onClick={handleEdit}>
                      <BsPencilSquare />
                      EDIT
                    </button>
                  </div>
                </>
            }
          </div>
          <p className='errorMassage'>{errorMassage}</p>
          {
            !openEdit ? <></> :
              <>
                <button value={content.body} id="body" className="submit-button" onClick={handleSave}>
                  SUBMIT
                </button>
                <Button variant="outlined" onClick={handleEdit}>Cancel</Button>
              </>
          }
          <p>
            created at {tasks?.created_at && format(parseISO(tasks?.created_at), "yyyy / MM / dd ")}
          </p>
        </div>
      </div>
    </div>

  )
}

export default TaskPage