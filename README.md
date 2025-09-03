# 🎬 Movie Search App

Uma aplicação React para buscar filmes usando a API do TMDB (The Movie Database).

## ✨ Funcionalidades

- 🔍 Busca de filmes por título
- 📄 Paginação dos resultados
- 🎭 Página de detalhes do filme
- ❤️ Sistema de favoritos com localStorage
- 📱 Design responsivo
- 🌟 Exibição de filmes populares

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Chave da API do TMDB

### Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JoaoPaulo23342/MovieFinder.git
   cd projeto-prati
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure a API do TMDB:**
   - Acesse [TMDB](https://www.themoviedb.org/settings/api)
   - Crie uma conta e obtenha sua chave da API
   - Copie o arquivo `.env` e substitua `YOUR_TMDB_API_KEY_HERE` pela sua chave:
   ```
   VITE_TMDB_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```


## 🛠️ Tecnologias utilizadas

- **React** - Biblioteca para construção da interface
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **CSS3** - Estilização
- **TMDB API** - Base de dados de filmes

## 📁 Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/
│   ├── Loading/
│   ├── MovieCard/
│   └── Pagination/
├── pages/              # Páginas da aplicação
│   ├── SearchPage/
│   ├── MovieDetailsPage/
│   └── FavoritesPage/
├── services/           # Serviços de API
│   └── tmdbApi.js
├── hooks/              # Custom hooks
│   └── useFavorites.js
└── utils/              # Utilitários
```

## 🎯 Funcionalidades implementadas

- [x] Configuração do projeto React com Vite
- [x] Estrutura de pastas e componentes
- [x] Integração com API do TMDB
- [x] Página de busca com resultados
- [x] Paginação
- [x] Página de detalhes do filme
- [x] Sistema de favoritos
- [x] Roteamento
- [x] Design responsivo
- [x] Tratamento de erros
- [x] Estados de loading

## 📝 Como usar

1. **Buscar filmes:** Digite o nome do filme na barra de pesquisa
2. **Ver detalhes:** Clique no botão "Ver Detalhes" em qualquer filme
3. **Adicionar aos favoritos:** Clique no coração para adicionar/remover dos favoritos
4. **Ver favoritos:** Acesse a página de favoritos pelo menu

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.


