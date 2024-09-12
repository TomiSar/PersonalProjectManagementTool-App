import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../../../actions/backlogActions';

function ProjectTask({ deleteProjectTask, projectTask }) {
  const {
    projectSequence,
    priority,
    summary,
    acceptanceCriteria,
    projectIdentifier,
  } = projectTask;

  const priorityString =
    priority === 1 ? 'HIGH' : priority === 2 ? 'MEDIUM' : 'LOW';

  const priorityClass =
    priority === 1 ? 'bg-danger' : priority === 2 ? 'bg-warning' : 'bg-info';

  const onDeleteClick = (backlogId, projectTaskId) => {
    deleteProjectTask(backlogId, projectTaskId);
  };

  return (
    <div className='card mb-1 bg-light'>
      <div className={`card-header text-primary text-light ${priorityClass}`}>
        ID: {projectSequence} -- Priority: {priorityString}
      </div>
      <div className='card-body bg-light'>
        <h5 className='card-title'>{summary}</h5>
        <p className='card-text text-truncate fst-italic fs-6'>
          {acceptanceCriteria}
        </p>
        <Link
          className='btn btn-primary m-4 w-45'
          to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`}
        >
          Update
        </Link>

        <button
          className='btn btn-danger m-2 w-45'
          onClick={() =>
            onDeleteClick(
              projectTask.projectIdentifier,
              projectTask.projectSequence
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTask);
