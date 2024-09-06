import ProjectTask from './ProjectTasks/ProjectTask';

function Backlog({ projectTasks }) {
  // Filter task depending on status
  const filterTaskByStatus = (status) =>
    projectTasks
      .filter((projectTask) => projectTask.status === status)
      .map((projectTask) => (
        <ProjectTask key={projectTask.id} projectTask={projectTask} />
      ));

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card text-center mb-2 border-black'>
            <div className='card-header bg-info bg-gradient text-white rounded'>
              <h3 className='fs-2'>TO DO</h3>
            </div>
          </div>
          {filterTaskByStatus('TO_DO')}
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2 border-black'>
            <div className='card-header bg-warning bg-gradient text-white rounded'>
              <h3 className='fs-2'>IN PROGRESS</h3>
            </div>
          </div>
          {filterTaskByStatus('IN_PROGRESS')}
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2 border-black'>
            <div className='card-header bg-success bg-gradient text-white rounded'>
              <h3 className='fs-2'>DONE</h3>
            </div>
          </div>
          {filterTaskByStatus('DONE')}
        </div>
      </div>
    </div>
  );
}

export default Backlog;
