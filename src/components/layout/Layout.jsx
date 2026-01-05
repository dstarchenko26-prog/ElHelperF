import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;