import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBacklog } from '../../actions/backlogActions';
import { clearErrors } from '../../actions/errorActions';
import { IoIosArrowBack } from 'react-icons/io';
import { GoTasklist } from 'react-icons/go';
import Backlog from './Backlog';

function ProjectBoard({ getBacklog, backlog, clearErrors, errors }) {
  const { id } = useParams();

  useEffect(() => {
    clearErrors();
    getBacklog(id);
  }, [id, getBacklog, clearErrors]);

  const renderBoardContent = (errors, projectTasks) => {
    if (projectTasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className='alert alert-danger text-center' role='alert'>
            <h3 className='fs-4'>{errors.projectNotFound}</h3>
          </div>
        );
      } else if (errors.projectIdNotFound) {
        return (
          <div className='alert alert-danger text-center' role='alert'>
            <h3 className='fs-4'>{errors.projectIdNotFound}</h3>
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
        <GoTasklist className='m-1' /> Create Project Task
      </Link>
      <br />
      <Link className='btn btn-light' to='/dashboard'>
        <IoIosArrowBack /> Back to Dashboard
      </Link>
      <hr />
      {renderBoardContent(errors, projectTasks)}
    </div>
  );
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog, clearErrors })(
  ProjectBoard
);
