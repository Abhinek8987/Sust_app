// App.jsx
import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Customers from './Customers';
import ContactUs from './ContactUs'; // Import the Contact Us page

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <div className={`grid-container ${openSidebarToggle ? 'sidebar-open' : ''}`}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} handleNavigation={handleNavigation} />

      <main className="main-content">
        {activePage === 'home' && <Home />}
        {activePage === 'customers' && <Customers />}
        {activePage === 'contact' && <ContactUs />} {/* Add contact page here */}
      </main>
    </div>
  );
}

export default App;
