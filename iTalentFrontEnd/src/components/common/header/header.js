import React from 'react';

import Logo from '../logo/logo';
import Navbar from '../navbar/navbar';

function Header({hasNavbar}) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
          <Logo linkClass="navbar-brand" imgClass="img-fluid" />
          {hasNavbar && 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Navbar/>
          </div>
          }
      </nav>
    )
}

export default Header;