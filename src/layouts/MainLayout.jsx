import React, { useEffect } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const MainLayout = ({ children }) => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u') ||
        (e.ctrlKey && e.key.toLowerCase() === 's')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable image dragging
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };

    // Add listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col select-none">
      <Header />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
