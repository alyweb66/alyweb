import { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimationCanvas from "./Particle/Particle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import AlertTitle from "@mui/material/AlertTitle";
import emailjs from "@emailjs/browser";
import Grow from "@mui/material/Grow";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

import "./style/index.scss";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // useMemo to keep working the animationCanvas component throught the app lifecycle
  const animationCanvas = useMemo(() => <AnimationCanvas />, []);
  // Modal component
  function MyVerticallyCenteredModal({ isOpen, setIsOpen }) {
    const [growIn, setGrowIn] = useState(true);
    const closeModal = () => setIsOpen(false);
    const resetGrowIn = () => setGrowIn(true);

    // props validation
    MyVerticallyCenteredModal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      setIsOpen: PropTypes.func.isRequired,
    };
    return (
      <Modal
        className="modal"
        open={isOpen}
        onClose={resetGrowIn}
        aria-labelledby="legal-notices-modal-title"
        aria-describedby="legal-notices-modal-description"
        container={document.body}
        slotProps={{
          backdrop: {
            onClick: closeModal,
            "aria-label": "Close modal",
          },
        }}
        role="dialog"
        aria-modal="true"
        lang="fr"
      >
        <Grow in={growIn} timeout={500} onExited={() => setIsOpen(false)}>
          <div className="modal-content">
            <header className="modal-header">
              <h1 className="modal-header-title">Mentions Légales</h1>
            </header>
            <div className="modal-body">
              <div className="modal-body-container">
                <p className="modal-body-container-text">
                  <strong className="legal-info strong">
                    Nom de la société:
                  </strong>{" "}
                  Alyweb
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">Adresse:</strong> 90 Cami del
                  borreller, 66300 Montauriol, France
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">Téléphone:</strong>{" "}
                  <a className="contact-link" href="tel:+33763800517">
                    07 63 80 05 17
                  </a>
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">Email:</strong>{" "}
                  <a className="contact-link" href="mailto:contact@alyweb.fr">
                    contact@alyweb.fr
                  </a>
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">
                    Directeur de la publication:
                  </strong>{" "}
                  Pierrick ALEMANY
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">Siret:</strong> 52090245300023
                </p>
                <p className="modal-body-container-text">
                  <strong className="strong">Hébergeur:</strong> Hostinger
                  International Ltd., 61 Lordou Vironos Street, 6023 Larnaca,
                  Chypre, TEL : +370 5 204 1905
                </p>
                <p className="modal-body-container-text recaptcha">
                  Ce site est protégé par reCAPTCHA et Google.
                  L&apos;utilisation de reCAPTCHA est soumise à la{" "}
                  <a
                    className="contact-link"
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Politique de confidentialité
                  </a>{" "}
                  et aux{" "}
                  <a
                    className="contact-link"
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conditions d&apos;utilisation
                  </a>{" "}
                  de Google. Cette technologie permet de détecter les
                  comportements automatisés malveillants et de protéger
                  l&apos;envoi de formulaires contre les robots.
                </p>
              </div>
            </div>
            <footer className="modal-footer">
              <button className="modal-close" onClick={() => setGrowIn(false)}>
                Fermer
              </button>
            </footer>
          </div>
        </Grow>
      </Modal>
    );
  }

  return (
    <div className="app">
      <Suspense fallback={<div className="anim" />}>
        <div className="anim">
          {/* <AnimationCanvas /> */}
          {animationCanvas}
        </div>
        <Content />
        <footer className="footer">
          <p
            className="legal-notices"
            onClick={() => setIsOpen(true)}
            aria-label="Mentions légales"
          >
            Mentions légales
          </p>
          <p className="copy">
            &copy; {new Date().getFullYear()} Alyweb. Tous droits réservés.
          </p>
        </footer>
        <MyVerticallyCenteredModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
        />
      </Suspense>
    </div>
  );
}

// content component
function Content() {
  //State
  const [selectedTab, setSelectedTab] = useState(0);
  const [direction, setDirection] = useState("left");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [growIn, setGrowIn] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [loading, setLoading] = useState(false);

  // Tabs for swipe navigation
  const tabs = ["home", "contact"];

  const RECAPTCHA_SITE_KEY = "6Le0xcYqAAAAAJs_mOEO_isVnVYpOkBZNojjJ9Zc";

  useEffect(() => {
    // Create a script tag to load reCAPTCHA
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}&badge=inline`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Nettoyer les entrées utilisateur
    const cleanName = DOMPurify.sanitize(name);
    const cleanEmail = DOMPurify.sanitize(email);
    const cleanMessage = DOMPurify.sanitize(message);
    // collect form data
    const formData = {
      from_name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    };

    // Générer un token reCAPTCHA
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token) => {
          // Add token to EmailJS form data
          const templateParams = {
            ...formData,
            "g-recaptcha-response": token, // EmailJS verify the token
          };

          // Send email with EmailJS
          emailjs
            .send("service_vfn9qt2", "template_j96bahp", templateParams, {
              publicKey: "PBK_wk5ckn6u4u7T0",
            })
            .then(
              function () {
                setLoading(false);
                setShowAlert("success");
                setEmail("");
                setMessage("");
                setName("");

                setTimeout(() => {
                  setGrowIn(false);
                }, 5000);
              },
              function (error) {
                setLoading(false);
                console.error("Erreur lors de l'envoi de l'email:", error);
                setShowAlert("error");

                setTimeout(() => {
                  setGrowIn(false);
                }, 5000);
              }
            );
        });
    });
  };

  // first render for stop swipe animation at starting
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Logos for technologies used
  const logos = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React",
      delay: 0.2,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      alt: "Node.js",
      delay: 0.4,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      alt: "Next.js",
      delay: 0.5,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL",
      delay: 0.7,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      alt: "JavaScript",
      delay: 0.6,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      alt: "PostgreSQL",
      delay: 0.8,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      alt: "GraphQL",
      delay: 1.0,
    },
  ];

  // Check if the user swiped left or right
  const handleDragEnd = (_, info) => {
    const { offset } = info;

    if (offset.x < -100 && selectedTab < tabs.length - 1) {
      // Left swipe
      setDirection("left");
      setSelectedTab(selectedTab + 1);
    } else if (offset.x > 100 && selectedTab > 0) {
      // Right swipe
      setDirection("right");
      setSelectedTab(selectedTab - 1);
    }
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Handle tab change
  const handleTabChange = (index) => {
    setDirection(index > selectedTab ? "left" : "right");
    setSelectedTab(index);
  };

  return (
    <>
      {showAlert && (
        <div className="alert-container" aria-live="assertive">
          <Grow
            in={growIn}
            timeout={500}
            onExited={() => {
              setGrowIn(true);
              setShowAlert("");
            }}
          >
            <Stack className="alert" spacing={2}>
              <Alert variant="filled" severity={showAlert}>
                <AlertTitle>
                  {showAlert === "success" ? "Envoyé" : "Erreur"}
                </AlertTitle>
                {showAlert === "success"
                  ? "Votre mail a bien été envoyé."
                  : "Une erreur est survenue. Veuillez réessayer."}
              </Alert>
            </Stack>
          </Grow>
        </div>
      )}
      <img className="logo-background" src="/code3.png" alt="Background logo" />
      <header className="header">
        <img
          className="logo"
          src="/alyweb-1024.png"
          alt="Alyweb logo"
          onClick={() => window.location.reload()}
        />
        <h1 className="title">Alyweb</h1>
      </header>
      <div className="content">
        <div className="description-wrapper">
          <section className="description">
            <AnimatePresence custom={direction} exitBeforeEnter>
              {selectedTab === 0 && (
                <motion.div
                  key="home"
                  drag="x"
                  onDragEnd={handleDragEnd}
                  dragConstraints={{ left: 0, right: 0 }}
                  className="description-content"
                  custom={direction}
                  variants={variants}
                  initial={isFirstRender ? false : "enter"}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <h2 className=" sub-title">Bienvenue chez Alyweb</h2>
                  <p className=" text">
                    Vous souhaitez moderniser votre présence en ligne ou
                    optimiser vos outils internes, nous créons des solutions sur
                    mesure adaptées à vos besoins.
                    
                   {/*  <br />
                    <br />
                    N&apos;hésitez pas à nous contacter pour plus
                    d&apos;informations. */}
                  </p>
                  <ul className=" list">
                      <li>✔️ Sites web responsive et design attractif</li>
                      <li>
                        ✔️ Applications mobiles intuitives et performantes
                      </li>
                      <li>
                        ✔️ Solutions personnalisées adaptées à vos besoins
                      </li>
                      <li>✔️ Accompagnement et expertise à chaque étape</li>
                    </ul>
                  <h2 className="sub-title">
                    Les technologies que nous utilisons
                  </h2>
                  <div className="tech-logo-container">
                    {logos.map((logo, index) => {
                      return (
                        <div key={index} className="tech-logo">
                          <img
                            className="tech-logo-img"
                            src={logo.src}
                            alt={logo.alt}
                          />
                          <p className="tech-logo-name">{logo.alt}</p>
                        </div>
                      );
                    })}
                  </div>
                  <h2 className=" sub-title">Dernière réalisation</h2>
                  <div className=" icons">
                    <a
                      className=" link"
                      target="_blank"
                      href="https://izipro.fr "
                      aria-label="Visitez Izipro"
                    >
                      <img
                        className=" logo-toupro"
                        src="https://izipro.fr/logos/logo-izipro-800x800.webp"
                        alt="Logo de Izipro"
                      />
                      <strong>Izipro</strong>
                    </a>
                  </div>
                </motion.div>
              )}
              {selectedTab === 1 && (
                <motion.div
                  key="contact"
                  drag="x"
                  onDragEnd={handleDragEnd}
                  dragConstraints={{ left: 0, right: 0 }}
                  className={`contact ${loading ? "loading" : ""}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {loading && (
                    <div className="spinner">
                      <div className="loader">
                        <span></span>
                      </div>
                      <div className="loader">
                        <span></span>
                      </div>
                      <div className="loader">
                        <i></i>
                      </div>
                      <div className="loader">
                        <i></i>
                      </div>
                    </div>
                  )}
                  <form
                    className="form"
                    onSubmit={handleSubmit}
                    aria-label="Formulaire de contact"
                  >
                    <h2 className="sub-title">Contact</h2>
                    <label className="form-label" htmlFor="name">
                      Nom*
                      <input
                        className="form-input"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Nom"
                      />
                    </label>
                    <label className="form-label" htmlFor="email">
                      Email*
                      <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Email"
                      />
                    </label>
                    <label className="form-label textarea" htmlFor="message">
                      Message*
                      <textarea
                        className="form-textarea"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Message"
                      ></textarea>
                    </label>
                    <div className="form-button-wrapper">
                      <div className="phone">
                        <img
                          className="phone-logo"
                          src="/phone.svg"
                          alt="Phone icon"
                        />
                        <p className="number">07 63 80 05 17</p>
                      </div>

                      <button
                        className="form-button"
                        type="submit"
                        aria-label="Envoyer le formulaire"
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
        <div className="button-wrapper">
          <div className="button-home">
            <img
              onClick={() => handleTabChange(0)}
              className={`img ${selectedTab === 0 ? "active" : ""}`}
              src="/Home.svg"
              alt="Home icon"
              aria-label="Aller à l'accueil"
            />
          </div>
          <div className="button-mail">
            <img
              onClick={() => handleTabChange(1)}
              className={`img ${selectedTab === 1 ? "active" : ""}`}
              src="/Mail.svg"
              alt="Mail icon"
              aria-label="Aller à la page de contact"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
