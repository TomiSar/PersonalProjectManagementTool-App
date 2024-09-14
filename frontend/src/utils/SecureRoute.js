import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SecureRoute = ({ children, security }) => {
  return security.validToken === true ? children : <Navigate to='/login' />;
};

SecureRoute.propTypes = {
  security: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(SecureRoute);
