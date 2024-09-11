function Login() {
  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <form>
              <div className='form-group'>
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

export default Login;
