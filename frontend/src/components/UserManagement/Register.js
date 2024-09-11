function Register() {
  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your Account</p>
            <form>
              <div className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Name'
                  name='name'
                  required
                />
              </div>
              <div className='form-group mt-2'>
                <input
                  className='form-control form-control-lg'
                  type='email'
                  placeholder='Email Address'
                  name='email'
                />
              </div>
              <div className='form-group mt-2'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  name='password'
                />
              </div>
              <div className='form-group mt-2'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                />
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

export default Register;
