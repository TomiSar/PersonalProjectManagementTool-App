import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Backlog from './Backlog';
import { getBacklog } from '../../actions/backlogActions';

function ProjectBoard({ backlog, getBacklog }) {
  const { id } = useParams();
  const { projectTasks } = backlog;

  useEffect(() => {
    getBacklog(id);
  }, [id, getBacklog]);

  // console.log(projectTasks);

  return (
    <div className='container'>
      <Link to={`/addProjectTask/${id}`} className='btn btn-primary mb-3'>
        <i className='fas fa-plus-circle'> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <Backlog projectTasks={projectTasks} />
    </div>
  );
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
