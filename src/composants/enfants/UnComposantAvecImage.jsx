function UnComposantAvecImage(props){
    const byteArray = props.details.photo;
    return (<>
    <div className="column is-3">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={byteArray}
                                 alt={props.details.nomcontient}/>
                        </figure>
                    </div>
                    <div className="card-header">
                        <div className="card-header-title">
                            {props.details.nommarque}
                            {/* le mbola misy le id alefa amin le bouton eo ambany eo */}
                        </div>
                        <a className="card-header-icon" aria-label="more options" href={`/modele/${props.details.idmarque}`}>
                            <span className="icon">
                                <span className="material-symbols-outlined">
                                    navigate_next
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            </>
        );
}
export default UnComposantAvecImage;