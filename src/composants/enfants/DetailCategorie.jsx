function DetailCategorie(props) {
    const nom = `nom${props.titre}`;
    var nomCategorie='';
    try{
        nomCategorie = props.details[nom].replace(/‚/g, 'é');
    }
    catch(error){
        nomCategorie='';
    }
    const resultat = decodeURIComponent(nomCategorie);
    // const resultat = decodeURIComponent(props.details[nom]);
    return <>
        <div className="column is-3">
            <div className="card">
                <div className="card-content">
                    <h3 className="subtitle has-text-weight-bold">
                        {resultat}
                    </h3>
                </div>
            </div>
        </div>
    </>
}
export default DetailCategorie;