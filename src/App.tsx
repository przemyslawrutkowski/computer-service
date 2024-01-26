import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegisterForm';
import ShowReports from "./components/ShowReports";
import EditReport from "./components/EditReport";


function App() {
  <a href="/register">About</a> 
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/reports" element={<ShowReports />} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/edit/:reportid" element={<EditReport />}/>
          <Route path="/login" element={<LoginForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
