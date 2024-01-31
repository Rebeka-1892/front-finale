import UnModele from "./enfants/UnModele";
import { useFetchData } from "../api-integrations/getFromApi";
import { useParams } from 'react-router-dom';
import ModalModele from "./modals/ModalModele";
function ComposantDuModele({ip}) {
    const { idmarque } = useParams();
    const apiName = `modele/m/${idmarque}`;
    const apiUrl = `${ip}/${apiName}`;
    const donnees = useFetchData(apiUrl);
    const renderDetails = () => {
        return donnees.map((detail, index) => (
            <UnModele details={detail} key={index}/>
        ));
    };
    const openModal =() => {
        document.querySelector('.modal').classList.add('is-active');
    }
    const closeModal = () => {
        document.querySelector('.modal').classList.remove('is-active');   
    }
    return (
        <>
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
                    <div className="pricing-table is-horizontal">
                        {renderDetails()}
                    </div>
                </div>
            </section>
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Nouveau modele</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <ModalModele api={`${ip}/modele`}  idmarque={idmarque}/>
                </div>
            </div>
        </>
    );
}
export default ComposantDuModele;