function UnModele(props){
        return (
            <>
                <div className="pricing-plan">
                <div className="plan-header">{props.details.categorie.nomcategorie}</div>
                <div className="plan-price"><span className="plan-price-amount"><span
                        className="plan-price-currency"></span>{props.details.nommodele}</span>
                </div>
                <div className="plan-items">
                    <div className="plan-item">{props.details.hauteur} x {props.details.longueur.toFixed(2)} x {props.details.largeur.toFixed(2)}</div>
                    <div className="plan-item">{props.details.reservoire} L</div>
                    <div className="plan-item">{(props.details.poids/1000).toFixed(2)} T</div>
                    <div className="plan-item">{props.details.carrosserie.nomcarrosserie}</div>
                </div>
            </div>
            </>
        );
}
export default UnModele;