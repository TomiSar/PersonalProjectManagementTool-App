import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/securityActions';
import classNames from 'classnames';

function Login({ login, errors, security }) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (security.validToken) {
      navigate('/dashboard');
    }
  }, [security.validToken, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginRequest = {
      username: userData.username,
      password: userData.password,
    };
    login(loginRequest);
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.username,
                  })}
                  type='text'
                  placeholder='Email Address'
                  name='username'
                  value={userData.username}
                  onChange={onChange}
                />
                {errors.username && (
                  <div className='invalid-feedback'>{errors.username}</div>
                )}
              </div>
              <div className='form-group mt-2'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.password,
                  })}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={userData.password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <input
                className='btn btn-lg btn-success w-100 mt-4'
                type='submit'
                value='Log In'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
