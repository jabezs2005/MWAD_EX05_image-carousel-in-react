import { useEffect, useCallback } from 'react';

/**
 * A hook that handles keyboard events
 * @param key The key to listen for
 * @param callback The function to call when the key is pressed
 */
const useKeyPress = (key: string, callback: () => void): void => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    },
    [key, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useKeyPress;