import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import OptionKely from "./OptionsKely";
import { useUpdateDataToken } from "../../api-integrations/getFromApi";

function DetailAnnonce({ ip, props }) {
    // bulmaCarousel.attach(".carousel", {
    //   slidesToScroll: 1,
    //   slidesToShow: 2.15,
    //   pagination: false,
    //   infinite: true,
    //   autoplay: true,
    // });

  const { idannonce } = useParams();
  const apivoiture = `${ip}/annonce/${idannonce}`;
  const [descri, setDescri] = useState("");
  const [prix, setPrix] = useState(null);

  const [Energie, setEnergie] = useState(null);
  const [Transmission, setTransmission] = useState(null);
  const [Drive, setDrive] = useState(null);
  const [Puissance, setPuissance] = useState(null);
  const [Kilometrage, setKilometrage] = useState(null);
  const [Cylindre, setCylindre] = useState(null);
  const [Modele, setModele] = useState(null);
  const [Porte, setPorte] = useState(null);
  const [Place, setPlace] = useState(null);
  const [Conduite, setConduite] = useState(null);
  const [Reservoire, setReservoire] = useState(null);
  const [Poids, setPoids] = useState(null);
  const [Longueur, setLongueur] = useState(null);
  const [Largeur, setLargeur] = useState(null);
  const [Hauteur, setHauteur] = useState(null);
  const [Fumeur, setFumeur] = useState(null);
  const [Categorie, setCategorie] = useState(null);
  const [Carrosserie, setCarrosserie] = useState(null);
  const [Annee, setAnnee] = useState(null);
  const [options, setOptions] = useState([]);
  const [Photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAnnonces = await fetch(apivoiture);
        const annoncesData = await responseAnnonces.json();

        setDescri(annoncesData.descri);
        setPrix(annoncesData.prix.toLocaleString("fr-FR"));

        setEnergie(annoncesData.voiture.energie.nomenergie);
        setTransmission(annoncesData.voiture.transmission.nomtransmission);
        setDrive(annoncesData.voiture.drivetype.nomdrivetype);
        setPuissance(annoncesData.voiture.puissance);
        setKilometrage(
          annoncesData.voiture.kilometrage.toLocaleString("fr-FR")
        );
        setCylindre(annoncesData.voiture.cylindre);

        setPhotos(annoncesData.voiture.photos);

        setModele(annoncesData.voiture.modele.nommodele);
        setPorte(annoncesData.voiture.nbporte);
        setPlace(annoncesData.voiture.nbplace);
        setConduite(annoncesData.voiture.conduite.nomconduite);
        setReservoire(annoncesData.voiture.modele.reservoire);
        setPoids(annoncesData.voiture.modele.poids);
        setLongueur(annoncesData.voiture.modele.longueur);
        setLargeur(annoncesData.voiture.modele.largeur);
        setFumeur(annoncesData.voiture.fumeur === 0 ? "Non fumeur" : "Fumeur");
        setHauteur(annoncesData.voiture.modele.hauteur);

        setCategorie(annoncesData.voiture.modele.categorie.nomcategorie);
        setCarrosserie(annoncesData.voiture.modele.carrosserie.nomcarrosserie);
        setAnnee(annoncesData.voiture.datesortie.substring(0, 4));
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchData();
  }, [apivoiture, ip]);

  useEffect(() => {
    let listoptions = [];

    const fetchOptions = async () => {
      const responseAnnonces = await fetch(apivoiture);
      const annoncesData = await responseAnnonces.json();

      const getOption = async (idoption) => {
        const option = `${ip}/options/${idoption}`;
        const responseOptions = await fetch(option);
        return await responseOptions.json();
      };

      await Promise.all(
        annoncesData.voiture.idoptions.map(async (idoption) => {
          const result = await getOption(idoption);
          listoptions.push(result.nomoptions);
        })
      );

      setOptions(listoptions);
    };

    fetchOptions().catch((error) => {
      console.error("An error occurred while fetching options: ", error);
    });
  }, []);

  const lien = `${ip}/validation`;
  const submitData = useUpdateDataToken();
  const confirmer = async (e) => {
    try {
        e.preventDefault();
        const objetAEnvoyer = {
            'etat': 1,
            'annonce' : {'idannonce': idannonce}
        };
        const responseData = await submitData(lien, objetAEnvoyer, localStorage.getItem('token'));
    } catch (error) {
    }
};
const supprimer = async (e) => {
    try {
        e.preventDefault();
        const objetAEnvoyer = {
            'etat': 2,
            'annonce' : {'idannonce': idannonce}
        };
        const responseData = await submitData(lien, objetAEnvoyer, localStorage.getItem('token'));
    } catch (error) {
    }
};

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
                  {options.map((list, index) => {
                    return <li key={index}> {list} </li>;
                  })}
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
                    <strong>Energie</strong> {Energie}
                  </li>
                  <li>
                    <strong>Transmission</strong> {Transmission}
                  </li>
                  <li>
                    <strong>Drive Type</strong> {Drive}
                  </li>
                  <li>
                    <strong>Puissance</strong> {Puissance} CV
                  </li>
                  <li>
                    <strong>Kilometrage</strong> {Kilometrage} Km
                  </li>
                  <li>
                    <strong>Cylindre</strong> {Cylindre}
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
              <h1 className="has-text-info">{Modele}</h1>
              <div className="tags">
                <span className="tag is-primary is-light">{Porte} portes</span>
                <span className="tag is-primary is-light">{Place} places</span>
                <span className="tag is-primary is-light">{Conduite}</span>
                <span className="tag is-primary is-light">{Reservoire} L</span>
                <span className="tag is-primary is-light">{Poids} T</span>
                <span className="tag is-primary is-light">
                  {Longueur}*{Largeur}*{Hauteur}
                </span>
                <span className="tag is-primary is-light">{Fumeur}</span>
              </div>
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">categorie</p>
                    <p className="title">{Categorie}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">carrosserie</p>
                    <p className="title">{Carrosserie}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Annee</p>
                    <p className="title">{Annee}</p>
                  </div>
                </div>
              </nav>
              <article>{descri}</article>
              <blockquote>
                <h3>MGA {prix} </h3>
              </blockquote>

              <div className="buttons is-right">
                <button
                  className="button is-info has-text-weight-semibold"
                  onClick={confirmer}
                >
                  Confirmer
                </button>
                <button
                  className="button is-danger has-text-weight-semibold"
                  onClick={supprimer}
                >
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
            {Photos.map((list, index) => {
                return (
                    <div className="tile is-parent" key={index}>
                        <div className="tile is-child item-1">
                            <figure className="image is-3by5">
                            <img
                                src={list}
                                alt="Placeholder image"
                            />
                            </figure>
                        </div>
                    </div>
                );
            })}
          

        </div>
      </div>
    </section>
  );
}

export default DetailAnnonce;
