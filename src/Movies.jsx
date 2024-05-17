import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://assignment-hazel-nine-38.vercel.app/api/admin/getmovies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleRatingChange = async (movieId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));

    try {
      const response = await axios.post(`https://assignment-hazel-nine-38.vercel.app/api/rating/movies/${movieId}/${userId}/rate`, {
        userId,
        movieId,
        rating
      });
      console.log('Rating submitted:', response.data);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between mb-6">
        <Link to={`/recommend1/${userId}`}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Recommendations by Genres
        </Link>
        <Link to={`/recommend2/${userId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Recommendations by Ratings
        </Link>
        <Link to={`/recommend3/${userId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Collaborative Filtering
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2">Genre: {movie.genre}</p>
            <p className="text-gray-700 mb-4">Release Year: {movie.release_year}</p>
            <div className="flex items-center">
              <span className="mr-2">Rating:</span>
              <select
                value={ratings[movie.id] || ''}
                onChange={(e) => handleRatingChange(movie.id, e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
