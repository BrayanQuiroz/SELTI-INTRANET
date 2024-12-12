import React from 'react';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={clsx('flex flex-col w-full flex-wrap min-h-screen')}>
      <Navbar />
      <main className="flex-grow flex">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
