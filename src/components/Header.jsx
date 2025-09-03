import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          🎬 MovieFinder
        </Link>
        
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🔍 Buscar
          </Link>
          
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            ❤️ Favoritos
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;