import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies, getPopularMovies } from '../services/tmdbApi';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Carregar filmes populares na inicialização
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // Limitar a 500 páginas
      setCurrentPage(page);
      setIsSearching(false);
    } catch (err) {
      setError('Erro ao carregar filmes populares. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) {
      loadPopularMovies(page);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(searchTerm, page);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // Limitar a 500 páginas
      setCurrentPage(page);
      setIsSearching(true);
    } catch (err) {
      setError('Erro ao buscar filmes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    handleSearch(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isSearching) {
      handleSearch(page);
    } else {
      loadPopularMovies(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    loadPopularMovies(1);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>🎬 Busca de Filmes</h1>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do filme..."
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-btn"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="search-btn">
            🔍 Buscar
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError('')} className="dismiss-btn">
            ✕
          </button>
        </div>
      )}

      <div className="results-info">
        <h2>
          {isSearching 
            ? `Resultados para "${searchTerm}"` 
            : 'Filmes Populares'
          }
        </h2>
        {movies.length > 0 && (
          <p>Página {currentPage} de {totalPages}</p>
        )}
      </div>

      {loading ? (
        <Loading message={isSearching ? 'Buscando filmes...' : 'Carregando filmes populares...'} />
      ) : (
        <>
          {movies.length > 0 ? (
            <>
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onDetailsClick={handleMovieDetails}
                    onFavoriteClick={toggleFavorite}
                    isFavorite={isFavorite(movie.id)}
                  />
                ))}n              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="no-results">
              <p>
                {isSearching 
                  ? 'Nenhum filme encontrado para sua busca.' 
                  : 'Nenhum filme disponível no momento.'
                }
              </p>
              {isSearching && (
                <button onClick={clearSearch} className="back-to-popular">
                  Ver Filmes Populares
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;