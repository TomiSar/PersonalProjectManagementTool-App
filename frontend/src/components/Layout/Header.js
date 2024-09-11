import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className='bgHeader fs-4 fw-bold navbar navbar-expand-sm mb-4'>
      <div className='container'>
        <a className='navbar-brand fs-3' href='Dashboard.html'>
          Personal Project Management Tool
        </a>
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
            <li className='nav-item'>
              <a className='nav-link' href='/dashboard'>
                Dashboard
              </a>
            </li>
          </ul>
          <div className='navbar-collapse justify-content-end'>
            <ul className='navbar-nav ml-auto'>
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
