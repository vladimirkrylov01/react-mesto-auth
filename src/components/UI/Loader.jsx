import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle one" />
        <div className="circle two" />
        <div className="circle three" />
      </div>
      <h2>Загрузка...</h2>
    </div>
  );
};

export default Loader;