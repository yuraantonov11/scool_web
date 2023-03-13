import React from 'react';
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the homepage</h1>
      <p>This is a simple React app.</p>
    </div>
  );
};

export default HomePage;
