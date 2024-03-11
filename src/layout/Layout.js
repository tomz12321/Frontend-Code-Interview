import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  const [isHidden, setIsHidden] = React.useState(false);

  if (typeof window !== 'undefined') {
    window.onscrollend = function handleScroll() {
      setIsHidden(false);
    };

    window.onscroll = function handleScroll() {
      setIsHidden(true);
    };
  }

  return (
    <>
      <div className={`${isHidden ? 'hidden' : ''} fixed w-full h-20`}>
        <header>
          <Navbar />
        </header>
      </div>
      <div className=''>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
