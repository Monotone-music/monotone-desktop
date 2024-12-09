import styles from './styles.module.scss';
import { Box, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';

const NavigationBar = () => {
  const navigate = useNavigate();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Update visibility based on the browser's history stack
  useEffect(() => {
    setCanGoBack(window.history.length > 1); // Can go back if history length > 1
    // Check if there is any history state (forward history)
    setCanGoForward(window.history.state?.key !== undefined);
  }, [window.history]);

  // Handle going back
  const handleGoBack = () => {
    if (canGoBack) {
      navigate(-1);  // Go back in history
    }
  };

  // Handle going forward
  const handleGoForward = () => {
    if (canGoForward) {
      navigate(1);  // Go forward in history
    }
  };

  return (
    <Box className={styles.container}>
      {/* Back Button */}
      <Box 
        onClick={handleGoBack} 
        className={`${styles['link-container']} ${!canGoBack ? styles.disabled : ''}`} 
        aria-disabled={!canGoBack}
      >
        <Icon as={IoChevronBackOutline} boxSize={7} />
      </Box>

      {/* Forward Button */}
      <Box 
        onClick={handleGoForward} 
        className={`${styles['link-container']} ${!canGoForward ? styles.disabled : ''}`} 
        aria-disabled={!canGoForward}
      >
        <Icon as={IoChevronForwardOutline} boxSize={7} />
      </Box>
    </Box>
  );
};

export default NavigationBar;
