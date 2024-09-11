import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='landing'>
      <div className='light-overlay landing-inner text-dark'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>
                Personal Project Management Tool
              </h1>
              <p className='lead'>
                Create your account to join active projects or start you own
              </p>
              <hr />
              <div className='d-flex justify-content-center'>
                <Link
                  className='btn btn-lg btn-primary w-50 m-5'
                  to='/register'
                >
                  Sign Up
                </Link>
                <Link className='btn btn-lg btn-success w-50 m-5' to='/login'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
