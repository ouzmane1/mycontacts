import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Inscription() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email :", email);
    console.log("Password :", password);
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Mot de passe :</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <p>
          Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    );
}