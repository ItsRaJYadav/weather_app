import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex items-center justify-center"> {/* Center align */}
        <h1 className="text-white text-2xl font-semibold">Weather App</h1>
      </div>
    </header>
  );
};

export default Header;
