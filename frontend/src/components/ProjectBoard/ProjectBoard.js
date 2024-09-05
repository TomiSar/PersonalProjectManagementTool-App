import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Backlog from './Backlog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBacklog } from '../../actions/backlogActions';

function ProjectBoard({ getBacklog, backlog }) {
  const { id } = useParams();

  useEffect(() => {
    getBacklog(id);
  }, [id, getBacklog]);

  return (
    <div className='container'>
      <Link to={`/addProjectTask/${id}`} className='btn btn-primary mb-3'>
        <i className='fas fa-plus-circle'> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <Backlog />
    </div>
  );
}

ProjectBoard.propTypes = {
  getBackLog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
