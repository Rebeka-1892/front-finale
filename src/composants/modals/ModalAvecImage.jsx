import React, { useState } from 'react';
import { useSubmitData, useFetchData } from '../../api-integrations/getFromApi';
import resizeAndCompressImage from '../../api-integrations/getFromApi';
import imageCompression from 'browser-image-compression';
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
    document.querySelector('.modal').classList.remove('is-active');
    const formulaire = document.querySelector('form');
    const formData = new FormData(formulaire);
    const marque = formData.get('nommarque');
    const fichier = formData.get('sary');
    const idcontinent = formData.get('idcontinent');
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    try {
      // console.log("compressedFile");

      const compressedFile = await imageCompression(fichier, options);
      const compressedImg = await resizeAndCompressImage(compressedFile);
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
      // console.log(responseData);
      window.location.reload();
    } catch (error) {
      console.log(error);
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
                        <input className="file-input" type="file" name="sary"/>
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