import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, Typography, CircularProgress, Modal, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';

const PetList = ({ searchParams }) => {
  const [pets, setPets] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPets = async () => {
      const { animal, location, breed } = searchParams;
      const url = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        setPets(response.data.pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [searchParams]);

  const handleViewDetails = (pet) => {
    setShowDetails(pet);
  };

  const handleCloseModal = () => {
    setShowDetails(null);
  };

  const handleAddFavorite = (pet) => {
    dispatch(addFavorite(pet));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="text-center p-4">
        <motion.h1
          className="text-3xl font-bold mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
        >
          Welcome to Pet Finder!
        </motion.h1>
      </div>
      <div className="row">
        {pets.map((pet) => (
          <motion.div
            key={pet.id}
            className="col-12 col-md-6 col-lg-4 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              variant="outlined"
              style={{ padding: '1rem', cursor: 'pointer', position: 'relative' }}
            >
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
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </Carousel>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div">{pet.name}</Typography>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the Card
                    handleViewDetails(pet);
                  }}
                  variant="contained"
                  color="grey"
                  style={{ marginTop: '1rem' }}
                >
                  View Details
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the Card
                    handleAddFavorite(pet);
                  }}
                  variant="contained"
                  color="grey"
                  style={{ marginTop: '1rem', marginLeft: '0.5rem' }}
                >
                  Add to Favorites
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal for pet details */}
      <Modal
        open={Boolean(showDetails)}
        onClose={handleCloseModal}
        aria-labelledby="pet-details-title"
        aria-describedby="pet-details-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          {showDetails && (
            <div>
              <Typography id="pet-details-title" variant="h6" component="h2">
                {showDetails.name}
              </Typography>
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showStatus={false}
                showArrows={true}
                className="w-full h-48 object-cover"
                style={{ marginTop: '1rem' }}
              >
                {showDetails.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${showDetails.name} ${index}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </Carousel>
              <Typography variant="body1" component="div" style={{ marginTop: '1rem' }}>
                <strong>Breed:</strong> #{showDetails.breed}
              </Typography>
              <Typography variant="body1" component="div" style={{ marginTop: '0.5rem' }}>
                <strong>Description:</strong> {showDetails.description}
              </Typography>
              <Typography variant="body1" component="div" style={{ marginTop: '0.5rem' }}>
                <strong>City:</strong> {showDetails.city}
              </Typography>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                color="secondary"
                style={{ marginTop: '1rem' }}
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PetList;
