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
import Landing from './components/Layout/Landing';
import Login from './components/UserManagement/Login';
import Register from './components/UserManagement/Register';
import SecureRoute from './utils/SecureRoute';
import { jwtDecode } from 'jwt-decode';
import { setJwtToken } from './utils/helpers';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJwtToken(jwtToken);
  const decoded_jwtToken = jwtDecode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Private Routes */}
            <Route
              path='/dashboard'
              element={
                <SecureRoute>
                  <Dashboard />
                </SecureRoute>
              }
            />
            <Route
              path='/addProject'
              element={
                <SecureRoute>
                  <AddProject />
                </SecureRoute>
              }
            />
            <Route
              path='/updateProject/:id'
              element={
                <SecureRoute>
                  <UpdateProject />
                </SecureRoute>
              }
            />
            <Route
              path='/projectBoard/:id'
              element={
                <SecureRoute>
                  <ProjectBoard />
                </SecureRoute>
              }
            />
            <Route
              path='/addProjectTask/:id'
              element={
                <SecureRoute>
                  <AddProjectTask />
                </SecureRoute>
              }
            />
            <Route
              path='/updateProjectTask/:backlogId/:projectTaskId'
              element={
                <SecureRoute>
                  <UpdateProjectTask />
                </SecureRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
