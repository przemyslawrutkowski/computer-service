import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegisterForm';
import ShowReports from "./components/ShowReports";
import EditReport from "./components/EditReport";
import ShowLogs from "./components/ShowLogs";


function App() {
  <a href="/register">About</a> 
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/reports" element={<ShowReports />} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/edit/:reportid" element={<EditReport />}/>
          <Route path="/showlogs" element={<ShowLogs />}/>
          <Route path="/login" element={<LoginForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
