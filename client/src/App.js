import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import RoutePrive from './pages/RoutePrive';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route
          path="/contacts"
          element={
            <RoutePrive>
              <Contact />
            </RoutePrive>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
