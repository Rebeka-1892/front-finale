import { useFetchData, useSubmitData, getFormValues } from '../../api-integrations/getFromApi';
const ModalModele = ({ api, idmarque }) => {
    const cat = useFetchData(api.replace(/modele/g, 'categorie'));
    const car = useFetchData(api.replace(/modele/g, 'carrosserie'));
    const categorie = () => {
        return cat.map((detail) => (
            <option value={detail.idcategorie} key={detail.idcategorie}>
                {detail.nomcategorie}
            </option>
        ));
    };
    const carrosserie = () => {
        return car.map((detail) => (
            <option value={detail.idcarrosserie} key={detail.idcarrosserie}>
                {detail.nomcarrosserie}
            </option>
        ));
    };


    const submitData = useSubmitData();
    const inserer = async (e) => {
        try {
            e.preventDefault();
            document.querySelector('.modal').classList.remove('is-active');
            const formulaire = document.querySelector('form');
            const formData = new FormData(formulaire);
            const modeleData = {
                "nommodele": formData.get('nommodele'),
                "marque": {
                    "idmarque": idmarque
                },
                "reservoire": formData.get('reservoire'),
                "poids": formData.get('poids'),
                "longueur": formData.get('longueur'),
                "largeur": formData.get('largeur'),
                "hauteur": formData.get('hauteur'),
                "categorie": {
                    "idcategorie": formData.get('idcategorie')
                },
                "carrosserie": {
                    "idcarrosserie": formData.get('idcarrosserie')
                }
            };
              const responseData = await submitData(api, modeleData);
              window.location.reload();
        } catch (error) {
        }
    };
    return (
        <>
            <form onSubmit={inserer}>
                <section className="modal-card-body">
                    <div className="content">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Modele</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Nom du modele" name="nommodele" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">A propos</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Reservoire" name="reservoire" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Poids" name="poids" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Dimension</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Longueur" name="longueur" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Largeur" name="largeur" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="text" className="input" placeholder="Hauteur" name="hauteur" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Details</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select name="idcategorie">
                                                {categorie()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select name='idcarrosserie'>
                                                {carrosserie()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot is-flex is-justify-content-right">
                    <button className="button" type='submit'>Valider</button>
                </footer>
            </form>
        </>
    );
}
export default ModalModele;