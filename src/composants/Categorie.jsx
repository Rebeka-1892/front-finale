import React, { useEffect, useState } from "react";
import DetailCategorie from "./enfants/DetailCategorie";
import { useFetchData} from '../api-integrations/getFromApi';
import ModalCategorie from "./modals/ModalCategorie";
function Categorie({ ip, apiName }) {
    const apiUrl = `${ip}/${apiName}`;
    const donnees = useFetchData(apiUrl);

    const renderDetails = () => {
        return donnees.map((detail, index) => (
            <DetailCategorie key={index} details={detail} titre={apiName} />
        ));
    };
    function openModal() {
        document.querySelector('.modal').classList.add('is-active');
    }
    function closeModal() {
        document.querySelector('.modal').classList.remove('is-active');
    }
    return <>
        <section className="section">
            <div className="container">
                <div className="buttons is-flex is-justify-content-end">
                    <button className="button py-5 px-3 is-rounded add-button" onClick={openModal}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="columns is-multiline">
                    {renderDetails()}
                </div>
            </div>
        </section>
        <div className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Nouvelle {apiName}</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <ModalCategorie ip={apiUrl} soratra={apiName}/>
            </div>
        </div>
    </>
}

export default Categorie;
