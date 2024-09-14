import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Landing({ security }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (security.validToken) {
      navigate('/dashboard');
    }
  }, [security.validToken, navigate]);

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

Landing.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(Landing);
