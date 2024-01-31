import React, { useState } from 'react';
import { useSubmitData, useFetchData } from '../../api-integrations/getFromApi';
import resizeAndCompressImage from '../../api-integrations/getFromApi';
// import { } from '../api-integrations/getFromApi';
const ModalAvecImage = ({ api }) => {
  const [compressedImage, setCompressedImage] = useState(null);
  const api0 = api.replace(/marque/g, 'continent');
  const donnees = useFetchData(api0);
  const renderDetails = () => {
    return donnees.map((detail) => (
      <option value={detail.idcontinent} key={detail.idcontinent}>
        {detail.nomcontinent}
      </option>
    ));
  };

  const ajouterEvenementValidation = async (e) => {
    e.preventDefault();
    recupDonneesFormulaire();
  };

  const recupDonneesFormulaire = async () => {
    const formulaire = document.querySelector('form');
    const formData = new FormData(formulaire);
    const marque = formData.get('nommarque');
    const fichier = formData.get('sary');
    const idcontinent = formData.get('idcontinent');

    try {
      const compressedImg = await resizeAndCompressImage(fichier);
      setCompressedImage(compressedImg);

      const jsonData = {
        nommarque: marque,
        continent: {
          idcontinent: idcontinent,
        },
        photo: compressedImg,
      };
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      if (!response.ok) {
        console.log(`Erreur HTTP : ${response.status}`);
      }

      const responseData = await response.json();
    } catch (error) {
      // alert('Erreur lors de la redimension et compression de l\'image :' + error);
    }
  };


  return (
    <>
      <form onSubmit={ajouterEvenementValidation} encType='multipart/form-data'>
        <section className="modal-card-body">
          <div className="content">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Marque</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control is-expanded">
                    <input type="text" className="input" placeholder="Nom de la marque" name="nommarque" />
                  </div>
                </div>

                <div className="field">
                  <div className="control is-expanded">
                    <div className="file">
                      <label className="file-label">
                        <input className="file-input" type="file" name="sary" onChange={async (e) => {
                          // Mettez à jour l'état de l'image compressée lors du changement du fichier
                          const file = e.target.files[0];
                          const compressedImg = await resizeAndCompressImage(file);
                          setCompressedImage(compressedImg);} }
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <span className="material-symbols-outlined">
                              upload_file
                            </span>
                          </span>
                          <span className="file-label">
                            Choose a file…
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-label is-normal'>
                <label className="label">Continent</label>
              </div>
              <div className='field-body'>
                <div className="field">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select name='idcontinent'>
                        {renderDetails()}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-right">
          <button className="button mavalidation" type='submit'>Valider</button>
        </footer>
      </form>
    </>
  );
}


export default ModalAvecImage;