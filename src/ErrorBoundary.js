// ErrorBoundary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (hasError) {
      navigate('/500');
    }
  }, [hasError, navigate]);

  const handleError = () => {
    setHasError(true);
  };

  return <div onClick={handleError}>{children}</div>;
};

export default ErrorBoundary;
