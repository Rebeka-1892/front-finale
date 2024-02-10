import Categorie from "./Categorie";
import 'bulma/css/bulma.min.css';
import 'bulma-dashboard/dist/bulma-dashboard.min.css';
import 'bulma-pricingtable/dist/css/bulma-pricingtable.min.css';
import 'bulma-carousel';
import 'bulma-pageloader';
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ComposantAvecImage from "./ComposantAvecImage";
import ComposantDuModele from "./ComposantDuModele.jsx";
import ComposantAnnonce from "./ComposantAnnonce.jsx";
import Option from "./Option.jsx";
import DetailAnnonce from "./enfants/detail_annonce.jsx";
import Dashboard from "./Dashboard.jsx";
import './backoffice.css';
import { useEffect } from 'react';
function BackOffice({ ip }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const buttonStyle = {
    backgroundColor: '#4c648e',
    color: 'white',
    borderRadius: '4px',
    padding: '7px',
    border: 'none',
    cursor: 'pointer'
  };
  useEffect(() => {
    const dashboardPanel = document.querySelector('.dashboard-panel');
    const closeMenu = document.querySelector('.close-menu');
    closeMenu.addEventListener('click', () => {
      dashboardPanel.classList.toggle('is-active');
    });
    const burger = document.querySelector('.navbar-burger');
    burger.addEventListener('click', () => {
      dashboardPanel.classList.toggle('is-active');
    });
  }, []);
  return (
    <>
      <div className="pageloader is-info"></div>
      <div className="dashboard is-full-height">
        <Menu></Menu>
        <div className="dashboard-main is-scrollable">
          <nav className="navbar is-fixed-top">
            <div className="navbar-brand">
              <div className="navbar-item">
                <h3 className="title">
                  Admin
                </h3>
              </div>
              <div className="navbar-burger">
                <span className="icon">
                  <i className="fa-solid fa-list fa-lg"></i>
                </span>
              </div>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item" >
                  <button onClick={handleSignOut} style={buttonStyle}>
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <Routes>
            {/* <Route exact path="/" element={<Categorie ip={ip} apiName="categorie" />} /> */}
            <Route path="/categorie" element={<Categorie ip={ip} apiName="categorie" />} />
            <Route path="/carrosserie" element={<Categorie ip={ip} apiName="carrosserie" />} />
            <Route path="/energie" element={<Categorie ip={ip} apiName="energie" />} />
            <Route path="/marque" element={<ComposantAvecImage ip={ip} />} />
            <Route path="/annonce" element={<ComposantAnnonce ip={ip} />} />
            <Route path="/modele/:idmarque" element={<ComposantDuModele ip={ip} />} />
            <Route path="/detailAnnonce/:idannonce" element={<DetailAnnonce ip={ip} />} />
            <Route path="/option" element={<Option ip={ip} />} />
            <Route path="/dashboard" element={<Dashboard ip={ip} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default BackOffice;