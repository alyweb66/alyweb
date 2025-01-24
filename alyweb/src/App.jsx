import "./style/index.scss";
import { Suspense, useState } from "react";
import AnimationCanvas from "./Particle/Particle";
//import { useEffect } from "react";

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div className="anim" />}>
        <div className="anim">
          <AnimationCanvas />
        </div>
        <Content />
        <footer className="footer">
          <p className="copy">
            &copy; {new Date().getFullYear()} Alyweb. Tous droits réservés.
          </p>
        </footer>
      </Suspense>
    </div>
  );
}

function Content() {
  const [selectedTab, setSelectedTab] = useState("home");
  /*   const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, message });
    // Ajouter ici la logique de soumission du formulaire, comme un appel API
  }; */
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



 


  const handleSubmit = () => {
    console.log("Form submitted");
  };
  return (
    <>
      <img className="logo-background" src="/code3.png" alt="" />
      <header className="header">
        <img className="logo" src="/alyweb-1024.png" alt="" />
        <h1 className="title">Alyweb</h1>
      </header>
      <div className="content">
        <div className="description-wrapper">
          <section className="description">
      
            {selectedTab === "home" && (
              <div className="description-content" >
           
                <h2 className=" sub-title">Bienvenue chez Alyweb</h2>
                <p className=" text">
                  Chez AlyWeb, nous proposons des solutions de développement web
                  sur mesure en utilisant des technologies modernes et
                  performantes.
                  <br />
                  <br />
                  N&apos;hésitez pas à nous contacter pour plus
                  d&apos;informations.
                </p>
                <h2 className="sub-title">
                  Les technologies que nous utilisons
                </h2>
                <div className="tech-logo-container">
                  {logos.map((logo, index) => {
                    return (
                      <div key={index} className="tech-logo">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          style={{ width: "60px" }}
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
                  >
                    <img
                      className=" logo-toupro"
                      src="https://izipro.fr/logos/logo-izipro-800x800.webp"
                      alt="toupro"
                    />
                    <strong>Izipro</strong>
                  </a>
                </div>
              </div>
            )}
            {selectedTab === "contact" && (
              <div className="contact"
        
              >
                <h2 className="sub-title">Contact</h2>
                <form className="form" onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="name">
                    Nom
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    aria-label="Nom"
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    aria-label="Email"
                  />
                  <label className="form-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    aria-label="Message"
                  ></textarea>
                  <div className="form-button-wrapper">
                    <button className="form-button" type="submit">
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
        <div className="logo-wrapper">
          <div className="logo-home">
            <img
              onClick={() => setSelectedTab("home")}
              className="img"
              src="/Home.svg"
              alt=""
            />
          </div>
          <div className="logo-mail">
            <img
              onClick={() => setSelectedTab("contact")}
              className="img"
              src="/Mail.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
