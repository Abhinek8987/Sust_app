import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Customers from './Customers';

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
        {activePage === 'home' ? <Home /> : activePage === 'customers' ? <Customers /> : null}
      </main>
    </div>
  );
}

export default App;
