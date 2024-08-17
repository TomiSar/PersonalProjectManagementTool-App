import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addProject' element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
