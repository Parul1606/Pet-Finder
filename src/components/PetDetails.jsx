/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetDetails = ({ petId }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://pets-v2.dev-apis.com/pets/${petId}`);
        setPet(response.data.pet);
      } catch (error) {
        console.error('Error fetching pet details:', error);
        setError('Failed to load pet details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
        <h2 className="text-lg font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!pet) {
    return <p>No pet details available.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg rounded-lg overflow-hidden">
        <img src={pet.images[0]} className="card-img-top" alt={pet.name} />
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
          <p className="text-xl mb-2"><strong>Breed:</strong> {pet.breed}</p>
          <p className="text-lg mb-4"><strong>Description:</strong> {pet.description}</p>
          <p className="text-lg mb-4"><strong>Age:</strong> {pet.age}</p>
          <p className="text-lg mb-4"><strong>City:</strong> {pet.city}</p>
          <p className="text-lg mb-4"><strong>Contact:</strong> {pet.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
