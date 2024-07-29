import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, removeFavorite } from '../redux/favoritesSlice';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, Typography, Button } from '@mui/material';

const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (petId) => {
    dispatch(removeFavorite(petId));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Your Favorites</h1>
      <div className="row">
        {favorites.length === 0 ? (
          <p className="text-center">No favorites added yet.</p>
        ) : (
          favorites.map(pet => (
            <div key={pet.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <Card variant="outlined" style={{ padding: '1rem' }}>
                <Carousel
                  showThumbs={false}
                  autoPlay
                  infiniteLoop
                  showStatus={false}
                  showArrows={true}
                  className="w-full h-48 object-cover"
                >
                  {pet.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`${pet.name} ${index}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="div">{pet.name}</Typography>
                  <Typography variant="body1" component="div">
                    <strong>Breed:</strong> {pet.breed}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <strong>Description:</strong> {pet.description}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <strong>City:</strong> {pet.city}
                  </Typography>
                  <Button
                    onClick={() => handleRemoveFavorite(pet.id)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: '1rem' }}
                  >
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
