import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Backlog from './Backlog';
import { getBacklog } from '../../actions/backlogActions';

function ProjectBoard({ getBacklog, backlog, errors }) {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    getBacklog(id);
  }, [id, getBacklog]);

  useEffect(() => {
    if (errors) setLocalErrors(errors);
  }, [errors]);

  const renderBoardContent = (errors, projectTasks) => {
    if (projectTasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className='alert alert-danger text-center' role='alert'>
            <h3 className='fs-4'>{errors.projectNotFound}</h3>
          </div>
        );
      } else {
        return (
          <div className='alert alert-info text-center' role='alert'>
            <h3 className='fs-4'>
              Project Board doesn't have any Project Tasks
            </h3>
          </div>
        );
      }
    } else {
      return <Backlog projectTasks={projectTasks} />;
    }
  };

  const { projectTasks } = backlog;

  return (
    <div className='container'>
      <Link to={`/addProjectTask/${id}`} className='btn btn-primary mb-3'>
        <i className='fas fa-plus-circle'> Create Project Task</i>
      </Link>
      <br />
      <hr />
      {renderBoardContent(errors, projectTasks)}
    </div>
  );
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
