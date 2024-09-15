import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';
import { FaRegCircleUser } from 'react-icons/fa6';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

function Header({ logout, security }) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { validToken, user } = security;

  const handleLogout = async () => {
    setIsLoggedOut(true);
    window.location.href = '/';
    await logout();
  };

  return (
    <nav className='headerBg fs-4 fw-bold navbar navbar-expand-sm mb-4'>
      <div className='container'>
        <Link className='navbar-brand fs-3' to='/'>
          <AiOutlineFundProjectionScreen className='fs-3' /> Personal Project
          Management Tool
        </Link>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            {validToken && user && (
              <li className='nav-item'>
                <Link className='nav-link m-3' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className='navbar-collapse justify-content-end'>
            <ul className='navbar-nav ml-3 gap-5'>
              {validToken && user ? (
                <>
                  {!isLoggedOut && (
                    <li className='nav-item'>
                      <Link className='nav-link' to='/dashboard'>
                        <FaRegCircleUser className='fs-2' /> {user.fullName}
                      </Link>
                    </li>
                  )}
                  <li className='nav-item'>
                    <Link className='nav-link' onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div className='d-flex flex-row-reverse gap-4'>
                    <li className='nav-item'>
                      <Link className='nav-link mr-auto' to='/register'>
                        Sign Up
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/login'>
                        Login
                      </Link>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
