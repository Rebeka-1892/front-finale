import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import OptionKely from "./OptionsKely";
import { useUpdateDataToken } from "../../api-integrations/getFromApi";

function DetailAnnonce({ ip, props }) {
//   bulmaCarousel.attach(".carousel", {
//     slidesToScroll: 1,
//     slidesToShow: 2.15,
//     pagination: false,
//     infinite: true,
//     autoplay: true,
//   });

    const { idannonce } = useParams();
    const apivoiture = `${ip}/annonce/${idannonce}`;
    const [descri, setDescri] = useState('');
    const [prix, setPrix] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const responseAnnonces = await fetch(apivoiture);
            const annoncesData = await responseAnnonces.json();
            // console.log(annoncesData);
            setDescri(annoncesData.descri);
            setPrix(annoncesData.prix);

        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
        };

        fetchData();
    }, [apivoiture, ip, descri]);

    return (
        <section className="section">
        <div className="columns">
            <div className="column is-7">
            <article className="media mb-6">
                <span className="media-left icon has-text-info is-size-3">
                <i className="fa-solid fa-gear"></i>
                </span>
                <div className="media-content">
                <div className="content">
                    <h3 className="has-text-info">Options</h3>
                    <ol>
                    <li>
                        In fermentum leo eu lectus mollis, quis dictum mi aliquet.
                    </li>
                    <li>
                        Morbi eu nulla lobortis, lobortis est in, fringilla felis.
                    </li>
                    <li>
                        Aliquam nec felis in sapien venenatis viverra fermentum nec
                        lectus.
                    </li>
                    <li>Ut non enim metus.</li>
                    <li>
                        In fermentum leo eu lectus mollis, quis dictum mi aliquet.
                    </li>
                    <li>
                        Morbi eu nulla lobortis, lobortis est in, fringilla felis.
                    </li>
                    <li>
                        Aliquam nec felis in sapien venenatis viverra fermentum nec
                        lectus.
                    </li>
                    <li>Ut non enim metus.</li>
                    </ol>
                </div>
                </div>
            </article>
            </div>
            <div className="column">
            <article className="media mb-6">
                <span className="media-left icon has-text-info is-size-3">
                <i className="fa-solid fa-wrench"></i>
                </span>
                <div className="media-content">
                <div className="content">
                    <h3 className="has-text-info">A propos</h3>
                    <ul>
                    <li>
                        <strong>Energie</strong> ok
                    </li>
                    <li>
                        <strong>Transmission</strong> Manuel
                    </li>
                    <li>
                        <strong>Drive Type</strong> AWD
                    </li>
                    <li>
                        <strong>Puissance</strong> 250CV
                    </li>
                    <li>
                        <strong>Kilometrage</strong> 689 652Km
                    </li>
                    <li>
                        <strong>Cylindre</strong> 6
                    </li>
                    <li>
                        <strong>Cubage</strong> 56000
                    </li>
                    </ul>
                </div>
                </div>
            </article>
            </div>
        </div>
        <div className="tile is-ancestor">
            <div className="tile is-parent is-6">
            <div className="tile is-child">
                <div className="content has-text-right has-text-left-mobile">
                <h1 className="has-text-info">Modele</h1>
                <div className="tags">
                    <span className="tag is-primary is-light">5 portes</span>
                    <span className="tag is-primary is-light">12 places</span>
                    <span className="tag is-primary is-light">Conduite gauche</span>
                    <span className="tag is-primary is-light">50L</span>
                    <span className="tag is-primary is-light">1.6T</span>
                    <span className="tag is-primary is-light">700*800*900</span>
                    <span className="tag is-primary is-light">Fumeur</span>
                </div>
                <nav className="level is-mobile">
                    <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">categorie</p>
                        <p className="title">3,456</p>
                    </div>
                    </div>
                    <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Type</p>
                        <p className="title">123</p>
                    </div>
                    </div>
                    <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Annee</p>
                        <p className="title">500</p>
                    </div>
                    </div>
                    <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Etat</p>
                        <p className="title">500</p>
                    </div>
                    </div>
                </nav>
                <article>
                    {descri}
                </article>
                <blockquote>
                    <h3>MGA {prix} </h3>
                </blockquote>

                <div className="buttons is-right">
                    <button className="button is-info has-text-weight-semibold">
                    Confirmer
                    </button>
                    <button className="button is-danger has-text-weight-semibold">
                    Supprimer
                    </button>
                </div>
                </div>
            </div>
            </div>
            <div
            className="tile is-6 carousel has-ribbon-top"
            style={{ overflowX: "hidden" }}
            >
            <div className="tile is-parent">
                <div className="tile is-child item-1">
                <figure className="image is-3by5">
                    <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                    />
                </figure>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child item-2">
                <figure className="image is-3by5">
                    <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                    />
                </figure>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child item-3">
                <figure className="image is-3by5">
                    <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                    />
                </figure>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}

export default DetailAnnonce;
