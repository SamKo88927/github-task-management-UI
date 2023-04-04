import React from 'react';
import './App.scss';
import TaskListPage from './Page/TaskListPage';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskPage from './Page/TaskPage';
import CreateTaskPage from './Page/CreateTaskPage';
import Footer from './component/Footer';

function App() {
  return (
    <div className="app">
      <BrowserRouter >
        <Header />
        <Routes >
          <Route path='/' element={<TaskListPage />} />
          <Route path='/:number' element={<TaskPage />} />
          <Route path='/create' element={<CreateTaskPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
