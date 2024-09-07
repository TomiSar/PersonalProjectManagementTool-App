import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addProject' element={<AddProject />} />
            <Route path='/updateProject/:id' element={<UpdateProject />} />
            <Route path='/projectBoard/:id' element={<ProjectBoard />} />
            <Route path='/addProjectTask/:id' element={<AddProjectTask />} />
            <Route
              path='/updateProjectTask/:backlogId/:projectTaskId'
              element={<UpdateProjectTask />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
