import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'movie-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage ao inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Adicionar filme aos favoritos
  const addToFavorites = (movie) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === movie.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  // Remover filme dos favoritos
  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Verificar se um filme está nos favoritos
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Alternar status de favorito
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};