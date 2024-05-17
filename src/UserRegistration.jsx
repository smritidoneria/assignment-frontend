import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const genres = ['Comedy', 'Drama', 'Action', 'Horror', 'Romance', 'Biography','Crime'];
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username,
      genre_preferences: selectedGenres,
    };

    try {
      const response = await axios.post('https://assignment-hazel-nine-38.vercel.app/api/user/register', data);
      const result = response.data;
      console.log(result);
      console.log(result.user.users_id);
      alert("Registered successfully");
      navigate('/movies', { state: { userId: result.user.users_id } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleGenreSelection = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter((g) => g !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre_preferences">
              Genre Preferences
            </label>
            <div className="relative">
              <input
                id="genre_preferences"
                name="genre_preferences"
                type="text"
                placeholder="Select genres"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                value={selectedGenres.join(', ')}
                onClick={toggleDropdown}
                readOnly
              />
              {dropdownOpen && (
                <div className="absolute bg-white shadow-md rounded mt-1 w-full z-10">
                  <ul className="list-none p-0 m-0">
                    {genres.map((genre) => (
                      <li
                        key={genre}
                        className={`py-2 px-4 hover:bg-gray-200 cursor-pointer ${selectedGenres.includes(genre) ? 'bg-gray-200' : ''}`}
                        onClick={() => toggleGenreSelection(genre)}
                      >
                        {genre}
                      </li>
                    ))}
                    <li className="py-2 px-4 border-t border-gray-300 cursor-pointer">
                      <button className="text-blue-500" onClick={toggleDropdown}>Done</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
