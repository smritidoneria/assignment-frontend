import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecommendationsII = () => {
  const { userId } = useParams();
  console.log("}}}",userId)
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rating/recommendationsII/${userId}`);
        console.log("|||",response.data);
        setMovies(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recommendations II</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2">Genre: {movie.genre}</p>
            <p className="text-gray-700 mb-4">Release Year: {movie.release_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsII;
