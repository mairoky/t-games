import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashGames from "../components/DashGames";
import DashUsers from '../components/DashUsers';
import DashReviews from '../components/DashReviews';
import DashboardComp from '../components/DashboardComp';
import DashMap from '../components/DashMap';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* games... */}
      {tab === 'games' && <DashGames />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* reviews */}
      {tab === 'reviews' && <DashReviews />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {/* Map */}
      {tab === 'map' && <DashMap />}
    </div>
  )
}

export default Dashboard