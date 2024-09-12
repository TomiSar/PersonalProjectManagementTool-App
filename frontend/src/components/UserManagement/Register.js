import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/securityActions';
import classNames from 'classnames';

function Register({ createNewUser, errors }) {
  const [userData, setUserData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: userData.username,
      fullName: userData.fullName,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };
    createNewUser(newUser, navigate);
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your Account</p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.fullName,
                  })}
                  type='text'
                  placeholder='Full Name'
                  name='fullName'
                  value={userData.fullName}
                  onChange={onChange}
                />
                {errors.fullName && (
                  <div className='invalid-feedback'>{errors.fullName}</div>
                )}
              </div>
              <div className='form-group mt-2'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.username,
                  })}
                  type='text'
                  placeholder='Email Address (Username)'
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
              <div className='form-group mt-2'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.confirmPassword,
                  })}
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={userData.confirmPassword}
                  onChange={onChange}
                />
                {errors.confirmPassword && (
                  <div className='invalid-feedback'>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <input
                className='btn btn-lg btn-primary w-100 mt-4'
                type='submit'
                value='Sign Up'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createNewUser })(Register);
