import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  experience: number;
}

const Header: React.FC<HeaderProps> = ({ experience }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">TasQuest</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">New Quest</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">Quest Log</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Hero Profile</Link>
            </li>
          </ul>
          <span className="navbar-text">
            XP: {experience}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;