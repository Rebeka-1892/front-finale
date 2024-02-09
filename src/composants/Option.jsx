import React, { useState } from 'react';
import { useSubmitData,useFetchData } from './../api-integrations/getFromApi';

function Option({ ip }) {
    const apiUrl = `${ip}/options`;
    const donnees =useFetchData(apiUrl);
    // console.log(donnees);
    const groupes = donnees.reduce((acc, element) => {
        // console.log(element);
        const idtype = element.type.idtype;
        if (!acc[idtype]) {
            acc[idtype] = [];
        }

        acc[idtype].push(element);
        return acc;
    }, {});
    const maxGroupLength = Math.max(
        groupes['1'] ? groupes['1'].length : 0,
        groupes['2'] ? groupes['2'].length : 0,
        groupes['3'] ? groupes['3'].length : 0
    );
    // console.log(groupes);

    // envoie des donnees
    const [categorie, setcategorie] = useState('');
    const handleInputChange = (e) => {
        // console.log(e.target.value);
        setcategorie(e.target.value);
      };
    const submitData = useSubmitData();
    const nom = "nomoptions";
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();        
            const formulaire = document.querySelector('form');
            const formData = new FormData(formulaire);
            const p = formData.get('idoption');
            const objetAEnvoyer = { [nom]: categorie, type: {'idtype':p} };
            const rep= await submitData(apiUrl, objetAEnvoyer);
            window.location.reload();
        } catch (error) {
            console.log("ee  ", error);
        }
    };
    return (
        <>
            <section className="section">
                <div className="container">
                    <form className="field is-grouped is-grouped-centered" onSubmit={handleSubmit}>

                        <div className="control">
                            <div className="select">
                                <select  name="idoption">
                                    <option value='1'>Intérieur</option>
                                    <option value='2'>Extérieur</option>
                                    <option value='3'>Securité</option>
                                </select>
                            </div>
                        </div>
                        <div className="control">
                            <input type="text" className="input" name="nomoption" placeholder="Nouvelle option..." 
                            value={categorie}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button is-info" type='submit'>
                                Valider
                            </button>
                        </div>
                    </form>

                    <section className="section table-container">
                        <table className="table is-bordered is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Intérieur</th>
                                    <th>Extérieur</th>
                                    <th>Securité</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(maxGroupLength)].map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{groupes['1'] && groupes['1'][rowIndex] ? groupes['1'][rowIndex].nomoptions : ''}</td>
                                        <td>{groupes['2'] && groupes['2'][rowIndex] ? groupes['2'][rowIndex].nomoptions : ''}</td>
                                        <td>{groupes['3'] && groupes['3'][rowIndex] ? groupes['3'][rowIndex].nomoptions : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </section>
        </>
    );
}
export default Option;