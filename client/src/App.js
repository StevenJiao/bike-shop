import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Ordering from './components/Ordering';
import Dashboard from './components/dashboard/Dashboard'
import Analytics from './components/dashboard/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard renderContent={() => <Analytics></Analytics>} contentName = "Analytics"></Dashboard>}></Route>
        <Route path='/dashboard/analytics' element={<Dashboard renderContent={() => <Analytics></Analytics>} contentName = "Analytics"></Dashboard>}></Route>
        <Route path='/dashboard/ordering' element={<Dashboard renderContent={() => <Ordering></Ordering>} contentName = "Ordering"></Dashboard>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
