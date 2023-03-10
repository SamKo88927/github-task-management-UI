import React, { useState, useEffect, ReactFragment } from 'react';
import axios from 'axios';
import "./tasklistpage.scss"
import Task from '../component/Task';
import Filters from '../component/Filters';
import RepoSearch from '../component/RepoSearch';

// import { Modal, Form, Input, Select, message } from 'antd';
const TaskListPage = () => {


    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [loading, setLoading] = useState(false);

  
    // const handleFilter = (status) => {
    //     if (status === 'all') {
    //         setFilteredTasks(tasks);
    //     } else {
    //         setFilteredTasks(tasks.filter((task) => task.status === status));
    //     }
    // };

    // const handleSort = (sortType) => {
    //     let sortedTasks = [...filteredTasks];
    //     if (sortType === 'ascend') {
    //         sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //     } else {
    //         sortedTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    //     }
    //     setFilteredTasks(sortedTasks);
    // };

    // const handleSearch = (value) => {
    //     setFilteredTasks(
    //         tasks.filter((task) => task.title.includes(value) || task.body.includes(value))
    //     );
    // };

    // const handleModal = (task = {}, isEdit = false) => {
    //     setVisible(true);
    //     setCurrentTask(task);
    //     setIsEdit(isEdit);
    // };

    // const handleOk = async () => {
    //   try {
    //     setLoading(true);
    //     let res;
    //     if (isEdit) {
    //       res = await axios.put(`/api/tasks/${currentTask._id}`, currentTask);
    //     } else {
    //       res = await axios.post('/api/tasks', currentTask);
    //     }
    //     setTasks([...tasks, res.data
    //     const updatedTasks = tasks.map((task) => {
    //         if (task._id === res.data._id) {
    //             return res.data;
    //         }
    //         return task;
    //     });

    //     setTasks(updatedTasks);
    //     setFilteredTasks(updatedTasks);
    //     setVisible(false);
    //     setLoading(false);
    //     message.success('Task updated successfully!');
    // } catch (err) {
    //     setLoading(false);
    //     message.error(err.message);
    // }
    //         };

    // const handleCancel = () => {
    //     setVisible(false);
    // };

    // const handleDelete = async (task) => {
    //     try {
    //         setLoading(true);
    //         await axios.delete(/api/tasks / ${ task._id });
    //         setTasks(tasks.filter((t) => t._id !== task._id));
    //         setFilteredTasks(filteredTasks.filter((t) => t._id !== task._id));
    //         setLoading(false);
    //         message.success('Task deleted successfully!');
    //     } catch (err) {
    //         setLoading(false);
    //         message.error(err.message);
    //     }
    // };

    // const handleChange = (field, value) => {
    //     setCurrentTask({ ...currentTask, [field]: value });
    // };
    const [tasks, setTasks] = useState<any>([
        { title: 'Task 1', body: 'Task 1 Body', state: 'Open' ,userAvatar:""},
        { title: 'Task 2', body: 'Task 2 Body', state: 'In Progress',userAvatar:"" },
        { title: 'Task 3', body: 'Task 3 Body', state: 'Done' ,userAvatar:""}
      ]);
    
      const [filter, setFilter] = useState('All');
      const [sort, setSort] = useState('Newest');
      const [search, setSearch] = useState('');

      const filteredTasks = tasks.filter((task: { status: string; }) => {
        if (filter === 'All') {
          return true;
        }
    
        return task.status === filter;
      });
    
      const sortedTasks = filteredTasks.sort((a: { createdAt: number; }, b: { createdAt: number; }) => {
        if (sort === 'Newest') {
          return b.createdAt - a.createdAt;
        }
    
        return a.createdAt - b.createdAt;
      });
    
      const searchedTasks = sortedTasks.filter((task: { title: string; body:string}) =>
        task.title.toLowerCase().includes(search.toLowerCase())||
        task.body.toLowerCase().includes(search.toLowerCase())
      );
      useEffect(() => {
        const getTasks = async () => {
          try {
              setLoading(true);
              const res = await axios.get('/auth/github/issue',{
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
                    'Content-Type': 'application/json'
                }
            });
              console.log(res.data[0].user.avatar_url)
              setTasks(res.data);
              setLoading(false);
          } catch (err) {
              setLoading(false);
          }
      };
        getTasks();
    }, []);
  
    
  const handleEdit = () => {
    // ...
  };

  const handleDelete = () => {
    // ...
  };
  const componentDidMount = ()=> {
    // axios
    //   .get('https://api.github.com/repos/{OWNER}/{REPO}/issues')
    //   .then(res => {
    //     this.setState({ issues: res.data });
    //   });
  }
  
//   const createIssue=(newIssue)=>{
//     axios
//       .post('https://api.github.com/repos/{OWNER}/{REPO}/issues', newIssue)
//       .then(res => {
//         const issues = [...this.state.issues, res.data];
//         this.setState({ issues });
//       });
//   }
  
//   const updateIssue= (updatedIssue)=>{
//     axios
//       .patch(`https://api.github.com/repos/{OWNER}/{REPO}/issues/${updatedIssue.number}`, updatedIssue)
//       .then(res => {
//         const index = this.state.issues.findIndex(
//           issue => issue.id === res.data.id
//         );
//         const issues = [
//           ...this.state.issues.slice(0, index),
//           res.data,
//           ...this.state.issues.slice(index + 1)
//         ];
//         this.setState({ issues });
//       });
//   }
  
//  const  deleteIssue = (issueId) => {
//     axios
//       .delete(`https://api.github.com/repos/{OWNER}/{REPO}/issues/${issueId}`)
//       .then(() => {
//         const index = this.state.issues.findIndex(
//           issue => issue.id === issueId
//         );
//         const issues = [
//           ...this.state.issues.slice(0, index),
//           ...this.state.issues.slice(index + 1)
//         ];
//         this.setState({ issues });
//       });
  // }
      return (
      <div className="task-list-page">
        <RepoSearch/>
        <Filters filter={filter} setFilter={setFilter}  sort={sort} setSort={setSort} search={search} setSearch={setSearch}  />
      <div className="task-list">
        {searchedTasks.map((task: { title: string;body: string,state: string,user:{avatar_url:string } },index: React.Key | null | undefined) => (
          <Task key={index} title={task.title}  body={task.body} state={task.state} userAvatar={task.user?.avatar_url}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};


  
export default TaskListPage