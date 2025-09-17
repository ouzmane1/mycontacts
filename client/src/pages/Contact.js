import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = process.env.API_URL; 

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contacts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Impossible de récupérer les contacts");
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, phone: Number(phone) }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de l'ajout");
      } else {
        setMessage("Contact ajouté avec succès !");
        setFirstName("");
        setLastName("");
        setPhone("");
        fetchContacts();
      }
    } catch (err) {
      setMessage("Impossible de contacter le serveur");
    }
  };

  const handleDelete = async (id) => {
    setMessage("");
    try {
      const response = await fetch(
        `${API_URL}/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Erreur lors de la suppression");
      } else {
        setMessage("Contact supprimé !");
        fetchContacts();
      }
    } catch (err) {
      setMessage("Impossible de contacter le serveur");
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/connexion"); 
  }

  return (
    <div>
      <h1>Page d'accueil - Contacts</h1>

      {message && <p>{message}</p>}

      <h2>Ajouter un contact</h2>
      <form onSubmit={handleAddContact}>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <h2>Liste des contacts</h2>
      <ul>
        {contacts.length === 0 && <li>Aucun contact</li>}
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.firstName} {contact.lastName} - {contact.phone}{" "}
            <button
              onClick={() => handleDelete(contact._id)}
              style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}