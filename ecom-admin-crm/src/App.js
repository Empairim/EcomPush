import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Sidebar from './components/sidebar/Sidebar.js';
import AdminComponent from './AdminComponent.js';
import './App.css';

function App() {
    const userRole = useSelector(state => state.user.role);
    return (
        <>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="App">
           
           
            {userRole === 'admin' && <AdminComponent />}
            <Outlet />
        </div>
        </>
    );
}

export default App;
