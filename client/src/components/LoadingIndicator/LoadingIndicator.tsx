import React from "react";
import "./LoadingIndicator.scss";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-indicator-overlay">
      <div className="loading-indicator-container">
        <div className="loading-indicator-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
