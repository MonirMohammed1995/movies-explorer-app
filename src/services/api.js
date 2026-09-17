export async function fetchMoviesOrShows(query = '') {
  try {
    let url = 'https://api.tvmaze.com/shows';
    if (query.trim().length > 0) {
      url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movie data from server.');
    }

    const data = await response.json();

    if (query.trim().length > 0) {
      return data.map(item => item.show);
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error.message || 'An error occurred while fetching movies.', { cause: error });
  }
}