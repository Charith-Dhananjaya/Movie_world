

const API_KEY = "06b339dc9d28786ca5c0516566a825d5";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_URL_PREFIX ="http://localhost:8000/aboutUs"

// export const getPopularMovies = async () => {
//     const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results;
//   };
  
  // export const searchMovies = async (query) => {
  //   const response = await fetch(
  //     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
  //       query
  //     )}`
  //   );
  //   const data = await response.json();
  //   return data.results;
  // };

  export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL_PREFIX}/getAboutUs`);
    const data = await response.json();
    return data.result;
  };

  export const searchMovies = async (query) => {
    const response = await fetch(
      `${BASE_URL_PREFIX}/getAboutUsById/${query}`
    );
    const data = await response.json();
    return data.result;
  };