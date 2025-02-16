// components/DisableRightClick.jsx
import { useEffect, useRef } from 'react';
import { ReactNode } from 'react';

const DisableRightClick = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref to the container

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent): void => {
      event.preventDefault();
    };

    const container = containerRef.current; // Get the container element

    if (container) {  // Check if the container exists
      container.addEventListener('contextmenu', handleContextMenu);

      return () => {
        container.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, []);

  return <div ref={containerRef}>{children}</div>; // Attach the ref to the container
};

export default DisableRightClick;