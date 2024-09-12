import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';
import { FaUserAstronaut } from 'react-icons/fa';

function Header({ logout, security }) {
  const { validToken, user } = security;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className='bgHeader fs-4 fw-bold navbar navbar-expand-sm mb-4'>
      <div className='container'>
        <Link className='navbar-brand fs-3' to='/'>
          Personal Project Management Tool
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            {validToken && user && (
              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className='navbar-collapse justify-content-end'>
            <ul className='navbar-nav ml-3'>
              {validToken && user ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                      <FaUserAstronaut /> {user.fullName}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/' onClick={handleLogout}>
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
