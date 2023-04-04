import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./tasklistpage.scss"
import Task from '../component/Task';
import Filters from '../component/Filters';
import RepoSearch from '../component/RepoSearch';
import SearchBar from '../component/SearchBar';
import useFetch from '../hooks/useFetch';
const TaskListPage = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [scrolledTimes, setScrolledTimes] = useState(0);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Oldest');
  const [search, setSearch] = useState('');
  const filteredTasks = tasks.filter((task: { labels: any; }) => {
    if (filter === 'All') {
      return true;
    }
    if (!task.labels[0]) {
      const labels = "open"
      return labels === filter.toLowerCase();
    } else {
      const name = task.labels[0].name
      return name.toLowerCase() === filter.toLowerCase();
    }
  });
  const sortedTasks = filteredTasks.sort((a: { created_at: Date }, b: { created_at: Date; }) => {
    if (sort !== 'Oldest') {
      return (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
    return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  });
  const searchedTasks = sortedTasks.filter((task: { title: string; body: string }) =>
    task.title?.toLowerCase().includes(search.toLowerCase()) ||
    task.body?.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    // 監聽window的scroll事件，以便在滾動到底部時調用handleScroll函數
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  // 此函數將會在滾動到列表底部時調用
  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrolledTimes((i) => i + 1)
    }
  }
  const [searchBar, setSearchBar] = useState<any>();
  const [getTaskUrl, setGetTaskUrl] = useState<string>('/auth/github/issue?offset=');
  //useFetch的url要配合搜尋 轉換不同的api 
  const { data, loading, setRefetchData } = useFetch( getTaskUrl + scrolledTimes)
  const handleSearchBar = async () => {
    setGetTaskUrl("/auth/github/search/issue?search="
    +searchBar+"&user="+repoOptions.user+"&repo="+repoOptions.repo
    +"&offset=")
    //留&offset=是因為想要不管是搜尋api還是一開始的顯示GET tasks api都可以有滾動功效
  }
  useEffect(() => {
    const getTasks = () => {
      setTasks(data);
    };
    const getMoreTasks = () => {
      setTasks([...data, ...tasks]);
    };
    if (scrolledTimes == 0) {
      getTasks();
    } else {
      getMoreTasks();
    }
  }, [data]);
  const [repoOptions, setRepoOptions ]= useState({
    user: "",
    repo: "",
  });
  return (
    <div className="task-list-page">
      <RepoSearch 
      repoOptions={repoOptions}
      setRepoOptions={setRepoOptions}
      />
      <SearchBar
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        handleSearch={handleSearchBar}
      />
      <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} search={search} setSearch={setSearch} />
      <div className="task-list">
        {!tasks && <>
          歡迎使用task management 請先登入管理issue</>}
        {searchedTasks?.map((task:
          {
            number: number;
            title: string;
            body: string,
            state: string,
            labels: any,
            url: string,
            user: { avatar_url: string }
          }, index: React.Key | null | undefined) => (
          <Task key={index}
            setRefetchData={setRefetchData}
            title={task.title}
            body={task.body}
            state={task.state}
            userAvatar={task.user?.avatar_url}
            labels={task.labels?.[0]?.name}
            number={task.number}
            repository_url={task.url}
          />
        ))}
      </div>
    </div>
  );
};



export default TaskListPage