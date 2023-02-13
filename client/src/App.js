import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Entry from './components/Entry';
import Analytics from './components/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/entry' element={<Entry></Entry>}></Route>
        <Route path='/analytics' element={<Analytics></Analytics>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
