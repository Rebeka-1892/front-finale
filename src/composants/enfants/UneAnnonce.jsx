import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';
import { useFetchData } from "../../api-integrations/getFromApi";
import '../../assets/css/style.css';
import 'bulma-list/css/bulma-list.css';
import { useEffect, useState } from 'react';
function UneAnnonce(props) {
    const [imagesDAnnonce, setImageDAnnonce] = useState(null);
    const [voiture, setVoiture] = useState(null);
    const [modele, setModele] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const voitureResponse = await fetch(`${props.ip}/voiture/${props.details.voiture.idvoiture}`);
                const voitureData = await voitureResponse.json();
                setVoiture(voitureData);
                const modeleResponse = await fetch(`${props.ip}/modele/${voitureData.modele.idmodele}`);
                const modeleData = await modeleResponse.json();
                setModele(modeleData.nommodele);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.ip, props.details.idvoiture]);
    const handleCarouselInit = () => {
        const existingCarousel = document.querySelector('.carousel');
        if (existingCarousel && existingCarousel.bulmaCarousel) {
            existingCarousel.bulmaCarousel.destroy();
        }
        bulmaCarousel.attach('.carousel', {
            slidesToScroll: 1,
            slidesToShow: 1,
            navigation: false,
        });
        
    };
    
    useEffect(() => {
        if (voiture) {
            setImageDAnnonce(voiture.photos[0]);
            handleCarouselInit();
        }
    }, [voiture]);

    return (
        <>
            <div className="tile is-parent is-4">
                <a className="tile is-child card" href={`/detailAnnonce/${props.details.idannonce}`}>
                    <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={imagesDAnnonce} alt="image" />
                    </figure>
                    </div>
                    <div className="card-content p-3">
                        <div className="list has-visible-pointer-controls has-overflow-ellipsis">
                            <div className="list-item">
                                <div className="list-item-content">
                                    <div className="list-item-title has-text-info">{modele}</div>
                                    <div className="list-item-description help">{props.details.descri}</div>
                                </div>

                                <div className="list-item-controls has-text-info">
                                    <span className="icon is-clickable">
                                        <i className="fa-solid fa-car-side fa-lg"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}
export default UneAnnonce;