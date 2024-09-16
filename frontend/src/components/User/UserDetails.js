import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { FaUserSecret } from 'react-icons/fa';

function UserDetails({ security }) {
  const [countTime, setCountTime] = useState('');
  const [jwtDataVisible, setJwtDataVisible] = useState(false);
  const { user } = security;

  const jwtValidTime = () => {
    const timeNow = Date.now() / 1000;
    const tokenValidTime = user.exp - timeNow;
    const minutes = Math.floor(tokenValidTime / 60);
    const seconds = Math.floor(tokenValidTime % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds} minutes`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const time = jwtValidTime();
      setCountTime(time);

      // Extract minutes and seconds
      const [minutesPart, secondsPart] = time.split(':');
      const minutes = parseInt(minutesPart, 10);
      const seconds = parseInt(secondsPart, 10);

      // Redirect to landing page if JWT expires
      if (minutes === 0 && seconds === 0) {
        window.location.href = '/';
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 m-auto'>
          <Link className='btn btn-light' to='/dashboard'>
            <IoIosArrowBack /> Back to Dashboard
          </Link>
          <h4 className='display-4 text-center'>
            <FaUserSecret className='m-1' /> User details
          </h4>
          {/* <hr /> */}
          <div className='card'>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>
                  <strong>Full name</strong>: {user.fullName}
                </label>
              </div>
              <div className='mb-3'>
                <label className='form-label'>
                  <strong>Username</strong>: {user.username}
                </label>
              </div>
              {jwtDataVisible && (
                <div className='mb-3'>
                  <label className='form-label'>
                    <strong>User JWT valid before logout</strong>: {countTime}
                  </label>
                </div>
              )}
              <button
                className={`btn btn-lg w-100 mt-4 ${
                  !jwtDataVisible ? 'btn-danger' : 'btn-success'
                }`}
                onClick={() => setJwtDataVisible(!jwtDataVisible)}
              >
                {!jwtDataVisible ? 'Show JWT data' : 'Hide JWT data'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserDetails.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(UserDetails);
