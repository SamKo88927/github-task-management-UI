import React, { useState } from 'react'
import "./createTaskPage.scss"
import axios from 'axios'
import { TextField } from '@material-ui/core';
import {
  Avatar,
  Button,
  FormControl,
} from '@mui/material';
import RepoSearch from '../component/RepoSearch';
const CreateTaskPage = () => {
  const [repoOptions, setRepoOptions] = useState({
    user: "SamKo88927",
    repo: "github-task-management-UI",
    title: "",
    body: "",
    assignees: ["SamKo88927"]
  });
  console.log(repoOptions.body)
  const [errorMassage, setErrorMassage] = useState("")
  const handleClick = async () => {
    if(repoOptions.title == ""){return setErrorMassage("Title cannot be empty!")}
    if (repoOptions.body == ""||repoOptions.title == "") {
      setErrorMassage("Body cannot be empty!")
    } else {
      try {
        const usr = await axios.post("/auth/github/issue", repoOptions, {
          headers: {
            'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
            'Content-Type': 'application/json'
          }
        })
        window.location.reload();
      } catch (error: any) {
        setErrorMassage(error?.response.data.message)
      }
    }
  }
  const handleChange = (e: { target: { id: any; value: any; } }) => {
    setRepoOptions(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  console.log(errorMassage)
  return (
    <div className='createTaskPage'>
      <div className="left">
        <RepoSearch 
        repoOptions={repoOptions}
        setRepoOptions={setRepoOptions}
        />
        <form  >
          <TextField label="Title"
              error={errorMassage == "Title cannot be empty!" ? true : false}
            id="title"
            fullWidth
            onChange={handleChange}
            value={repoOptions.title} variant="outlined"
          />

          <FormControl fullWidth margin="normal">
            <TextField
            error={errorMassage == "Body cannot be empty!" ||errorMassage == "Please input at least greater than 30 characters"  ? true : false}
              label="body"
              id="body"
              name="body"
              multiline
              placeholder='Leave a comment'
              variant="outlined"
              rows={6}
              value={repoOptions.body}
              onChange={handleChange}
            />
          </FormControl>
          <Button
    
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Submit
          </Button>
        </form>
        <p className='errorMassage'>{errorMassage}</p> 
      </div>
      <div className="right">
        <div className="label">
          Labels:
          <input type="text" id="Labels" className="labels-input" onChange={handleChange} />
        </div>
        <label className="label" >Assignees:
          <input type="text" id="assignees" value={repoOptions.assignees} className="labels-input" onChange={handleChange} />
        </label>
      </div>
   
    </div>
  )
}

export default CreateTaskPage