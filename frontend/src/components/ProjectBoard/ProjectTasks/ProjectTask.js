function ProjectTask({ projectTask }) {
  const { projectSequence, priority, summary, acceptanceCriteria } =
    projectTask;

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
          {/* {acceptanceCriteria || 'No Acceptance Criteria'} */}
          {acceptanceCriteria}
        </p>
        <a href='' className='btn btn-primary'>
          View / Update
        </a>

        <button className='btn btn-danger m-4'>Delete</button>
      </div>
    </div>
  );
}

export default ProjectTask;
