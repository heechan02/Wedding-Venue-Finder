import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ min: '', max: '' });
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/capacity', {
        params: formData,
      });
      setVenues(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setVenues([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Venue Capacity Search</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Capacity</label>
            <input
              type="number"
              name="min"
              value={formData.min}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Capacity</label>
            <input
              type="number"
              name="max"
              value={formData.max}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Search Venues
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {venues.length > 0 && (
          <table className="mt-6 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Venue Name</th>
                <th className="border border-gray-300 p-2 text-left">Weekend Price (£)</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{venue.name}</td>
                  <td className="border border-gray-300 p-2">{venue.weekend_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;