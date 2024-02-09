import React, { useState } from 'react';
import { useSubmitData } from '../../api-integrations/getFromApi';
const Modalcategorie = ({ ip, soratra }) => {
  const [categorie, setcategorie] = useState('');
  const handleInputChange = (e) => {
    setcategorie(e.target.value);
  };
  const submitData = useSubmitData();
  const nom = `nom${soratra}`;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      document.querySelector('.modal').classList.remove('is-active');
      const objetAEnvoyer = { [nom]: categorie };
      // Envoyer les données à l'API
      const apiUrl = ip;
      const responseData = await submitData(apiUrl, objetAEnvoyer);
      window.location.reload();
    } catch (error) {
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <section className="modal-card-body">
        <div className="content">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">{soratra}</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name={`nom${soratra}`}
                    placeholder={`Nom de la ${soratra}`}
                    value={categorie}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="modal-card-foot is-flex is-justify-content-right">
        <button className="button" type="submit">
          Valider
        </button>
      </footer>
    </form>
  );
};

export default Modalcategorie;
