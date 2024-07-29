import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/favoritesSlice';

const Navbar = ({ onSearch }) => {
  const favorites = useSelector(selectFavorites);
  const favoriteCount = favorites.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchParams = {
      animal: formData.get('animal'),
      location: formData.get('location'),
      breed: formData.get('breed'),
    };
    onSearch(searchParams);
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <form className="d-flex p-3 align-items-center flex-grow-1" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            name="animal"
            placeholder="Animal"
            aria-label="Search"
          />
          <input
            className="form-control me-2"
            type="search"
            name="location"
            placeholder="Location"
            aria-label="Search"
          />
          <input
            className="form-control me-2"
            type="search"
            name="breed"
            placeholder="Breed"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <Link
          to="/favorites"
          className="btn btn-outline-primary d-flex align-items-center"
          style={{ border: 'none' }}
        >
          <FontAwesomeIcon icon={faHeart} className="me-2" />
          <span>Favorites ({favoriteCount})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
