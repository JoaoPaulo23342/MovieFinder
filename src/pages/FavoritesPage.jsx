import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleBackToSearch = () => {
    navigate('/');
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <button onClick={handleBackToSearch} className="back-btn">
          ← Voltar à Busca
        </button>
        
        <h1>❤️ Meus Favoritos</h1>
        
        {favorites.length > 0 && (
          <p className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'filme' : 'filmes'} favorito{favorites.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetailsClick={handleMovieDetails}
              onFavoriteClick={toggleFavorite}
              isFavorite={isFavorite(movie.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <div className="no-favorites-icon">💔</div>
          <h2>Nenhum filme favorito ainda</h2>
          <p>
            Você ainda não adicionou nenhum filme aos seus favoritos.
            <br />
            Explore nossa coleção e adicione filmes que você gosta!
          </p>
          <button onClick={handleBackToSearch} className="explore-btn">
            🎬 Explorar Filmes
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;