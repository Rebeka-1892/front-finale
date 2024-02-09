import Categorie from "./composants/Categorie";
import 'bulma/css/bulma.min.css';
import 'bulma-dashboard/dist/bulma-dashboard.min.css';
import 'bulma-pricingtable/dist/css/bulma-pricingtable.min.css';
import 'bulma-carousel';
import 'bulma-pageloader';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import 'bulma-list/css/bulma-list.css';
import './assets/css/mystyle.css';
import Login from './composants/Login';
import BackOffice from "./composants/BackOffice";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
export default function App() {
  const ip ="https://back-autostream-production.up.railway.app";
  // const ip ="http://localhost:8080";
  const token = localStorage.getItem('token');
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<Login ip={ip} />}/>
        <Route
          path="/*"
          element={token ? <BackOffice ip={ip} /> : <Navigate to="/" />}
        />
        </Routes>
      </Router>
      
    </>
  );
}