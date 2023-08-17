
import { FaSignOutAlt } from 'react-icons/fa';

function Logout ({logout}){
    return(
        <nav className="navbar">
        <div className="navbar-left">
        <span className="message-space"><h4>MessageSpace</h4></span>
        </div>
        <div className="navbar-right">
        <button className="logout-button" onClick={logout}>
            Logout <FaSignOutAlt />
        </button>
        </div>
    </nav>
    )
}

export default Logout;