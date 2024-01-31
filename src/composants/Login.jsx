import { bulmaCarousel } from 'bulma-carousel/dist/js/bulma-carousel.min.js';
import '../assets/css/mystyle.css';
import '../assets/css/bulma-divider.css';
import {Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sary from '../assets/img/login.jpg';
import logo from '../assets/img/logo-white.png';
function Login({ ip }) {
    // animations
    function initCarouselLogin() {
        bulmaCarousel.attach('.carousel-login', {
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            infinite: true,
            navigation: false,
            navigationKeys: false,
            pagination: false,
        });
        removePagination();
    }
    function removePagination() {
        const previous = document.querySelectorAll('.slider-navigation-previous');
        previous.forEach((item) => {
            item.classNameList.add('is-hidden');
        });
        const next = document.querySelectorAll('.slider-navigation-next');
        next.forEach((item) => {
            item.classNameList.add('is-hidden');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('load', () => {
            document.querySelector('.pageloader').classNameList.add('is-active');
        });
        setTimeout(initCarouselLogin(), 1);
        // initCarouselLogin();
    });
    // metier
    const v = `${ip}/login/auth`;
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('pwd');
        const objetAEnvoyer = {
            'email': email,
            'mdp': password
        }
        try {
            const response = await fetch(v, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objetAEnvoyer)
            });
            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.response.token;
                localStorage.setItem('token',token);
                navigate('/marque');
            }
            else {
                alert('Échec de la connexion');
            }
        }
        catch (error) {
            alert('Erreur lors de la connexion', error);
        }
    }
    return (
        <>
            <div className="section" style={{height: '100vh'}}>
                <div className="box" style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
                    <div className="columns">
                        <div className="column is-8 p-0 is-hidden-touch">
                            <div className="carousel-login" style={{ overflowX: 'hidden' }}>
                                <div className="item-1">
                                    <figure className="image is-4by3">
                                        <img src={sary} alt="Placeholder image" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <form className="column is-4 is-full-touch pl-5" onSubmit={handleSubmit}>
                            <div className="content is-flex is-flex-direction-column is-justify-content-center"
                                style={{ height: '92.5%' }}>
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-64x64 is-flex">
                                        <img src={logo} className="is-rounded" />
                                    </figure>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        E-mail
                                    </label>
                                    <div className="control">
                                        <input type="email" className="input" placeholder="Entrez votre adresse e-mail" name='email' defaultValue='steph@gmail.com' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        Mot de passe
                                    </label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder="Entrez votre mot de passe" name='pwd' defaultValue='1234' />
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <div className="control">
                                        <button type='submit' className="button is-fullwidth is-info">
                                            Se connecter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;