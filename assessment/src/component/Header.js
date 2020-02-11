import React,{useContext} from 'react';
import { AuthContext } from '../context/auth';
import {Link } from 'react-router-dom';

function Header(){
      const {user, logout} = useContext(AuthContext);
      const menuBar = user ? (
<header>
<nav>
    <div className="nav-wrapper container">
      <a href="https://48p1r2roz4.sse.codesandbox.io" className="brand-logo">React</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to={'/location'}>Locations</Link></li>
        <li><Link to={'/projects'}>Projects</Link></li>
        <li><Link onClick={logout} to="">Logout</Link></li>
      </ul>
    </div>
  </nav>
</header>
        ):(
          <header>
<nav>
    <div className="nav-wrapper container">
      <a href="https://48p1r2roz4.sse.codesandbox.io" className="brand-logo">React</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Login</Link></li>
      </ul>
    </div>
  </nav>
</header>
        )
        return  menuBar;
}

export default Header;