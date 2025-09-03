import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdbApi';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/Loading';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <Loading message="Carregando detalhes do filme..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ops! Algo deu errado</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Voltar à Busca
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <h2>Filme não encontrado</h2>
        <p>O filme que você está procurando não foi encontrado.</p>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Voltar à Busca
        </button>
      </div>
    );
  }

  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const mainCast = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="movie-details-page">
      {backdropUrl && (
        <div 
          className="backdrop" 
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="backdrop-overlay"></div>
        </div>
      )}
      
      <div className="movie-details-content">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Voltar à Busca
        </button>
        
        <div className="movie-header">
          <div className="movie-poster-container">
            {posterUrl ? (
              <img 
                src={posterUrl} 
                alt={movie.title}
                className="movie-poster-large"
              />
            ) : (
              <div className="poster-placeholder-large">
                <span>Sem Imagem</span>
              </div>
            )}
          </div>
          
          <div className="movie-info-main">
            <h1 className="movie-title-large">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}
            
            <div className="movie-meta">
              <span className="meta-item">📅 {releaseYear}</span>
              <span className="meta-item">⏱️ {runtime}</span>
              <span className="meta-item">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
              {director && (
                <span className="meta-item">🎬 {director.name}</span>
              )}
            </div>
            
            <div className="movie-genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <button 
              className={`favorite-btn-large ${isFavorite(movie.id) ? 'favorite' : ''}`}
              onClick={() => toggleFavorite(movie)}
            >
              {isFavorite(movie.id) ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
            </button>
          </div>
        </div>
        
        <div className="movie-details-sections">
          {movie.overview && (
            <section className="movie-section">
              <h2>Sinopse</h2>
              <p className="movie-overview">{movie.overview}</p>
            </section>
          )}
          
          {mainCast.length > 0 && (
            <section className="movie-section">
              <h2>Elenco Principal</h2>
              <div className="cast-grid">
                {mainCast.map(actor => (
                  <div key={actor.id} className="cast-member">
                    {actor.profile_path ? (
                      <img 
                        src={getImageUrl(actor.profile_path, 'w185')}
                        alt={actor.name}
                        className="cast-photo"
                      />
                    ) : (
                      <div className="cast-photo-placeholder">
                        👤
                      </div>
                    )}
                    <div className="cast-info">
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          <section className="movie-section">
            <h2>Informações Adicionais</h2>
            <div className="additional-info">
              {movie.budget > 0 && (
                <div className="info-item">
                  <strong>Orçamento:</strong> ${movie.budget.toLocaleString()}
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="info-item">
                  <strong>Bilheteria:</strong> ${movie.revenue.toLocaleString()}
                </div>
              )}
              {movie.production_companies?.length > 0 && (
                <div className="info-item">
                  <strong>Produtoras:</strong> 
                  {movie.production_companies.map(company => company.name).join(', ')}
                </div>
              )}
              {movie.production_countries?.length > 0 && (
                <div className="info-item">
                  <strong>Países:</strong> 
                  {movie.production_countries.map(country => country.name).join(', ')}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;