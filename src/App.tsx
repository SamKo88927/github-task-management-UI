import React from 'react';
import './App.scss';
import TaskListPage from './Page/TaskListPage';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskPage from './Page/TaskPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter >
        <Header />
        <Routes >
          <Route path='/' element={<TaskListPage />} />
          <Route path='/:id' element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
