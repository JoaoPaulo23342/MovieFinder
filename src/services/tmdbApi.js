const API_KEY = 'YOUR_TMDB_API_KEY'; // Substitua pela sua chave da API do TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Função para buscar filmes
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na busca de filmes:', error);
    throw error;
  }
};

// Função para obter detalhes de um filme
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do filme');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    throw error;
  }
};

// Função para obter URL da imagem
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Função para obter filmes populares (para página inicial)
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes populares');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};