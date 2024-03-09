import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <header> 
        <Navbar />
      </header>
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;