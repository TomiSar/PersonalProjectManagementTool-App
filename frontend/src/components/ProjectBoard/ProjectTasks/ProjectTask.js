import { Link } from 'react-router-dom';

function ProjectTask({ projectTask }) {
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
          to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`}
          href=''
          className='btn btn-primary'
        >
          View / Update
        </Link>

        <button className='btn btn-danger m-4'>Delete</button>
      </div>
    </div>
  );
}

export default ProjectTask;
