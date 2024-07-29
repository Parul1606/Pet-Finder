import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import PetList from '../src/components/PetList';
import FavoritesList from './components/FavoritesList';

const App = () => {
  const [searchParams, setSearchParams] = React.useState({ animal: '', location: '', breed: '' });

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<PetList searchParams={searchParams} />} />
          <Route path="/favorites" element={<FavoritesList />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
