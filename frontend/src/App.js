import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import UpdateProject from './components/Project/UpdateProject';

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
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
