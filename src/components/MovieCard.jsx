import React from 'react';
import { getImageUrl } from '../services/tmdbApi';
import './MovieCard.css';

const MovieCard = ({ movie, onDetailsClick, onFavoriteClick, isFavorite }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'w300');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = '/placeholder-movie.png';
            }}
          />
        ) : (
          <div className="poster-placeholder">
            <span>Sem Imagem</span>
          </div>
        )}
        <button 
          className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={() => onFavoriteClick(movie)}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</p>
        
        <button 
          className="details-btn"
          onClick={() => onDetailsClick(movie.id)}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default MovieCard;