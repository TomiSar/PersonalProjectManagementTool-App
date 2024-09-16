import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProjectTask,
  updateProjectTask,
} from '../../../actions/backlogActions';
import { formatDateYearFirst } from '../../../utils/helpers';
import classNames from 'classnames';
import { IoIosArrowBack } from 'react-icons/io';

function UpdateProjectTask({
  getProjectTask,
  updateProjectTask,
  projectTask,
  errors,
}) {
  const [projectTaskData, setProjectTaskData] = useState({
    id: '',
    projectSequence: '',
    summary: '',
    acceptanceCriteria: '',
    status: '',
    priority: '',
    dueDate: '',
    projectIdentifier: '',
    create_At: formatDateYearFirst(projectTask.create_At),
  });

  const { backlogId, projectTaskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectTask(backlogId, projectTaskId, navigate);
  }, [backlogId, projectTaskId, getProjectTask, navigate]);

  useEffect(() => {
    if (projectTask) {
      setProjectTaskData({
        id: projectTask.id || '',
        projectSequence: projectTask.projectSequence || '',
        summary: projectTask.summary || '',
        acceptanceCriteria: projectTask.acceptanceCriteria || '',
        status: projectTask.status || '',
        priority: projectTask.priority || 0,
        dueDate: formatDateYearFirst(projectTask.dueDate) || '',
        projectIdentifier: projectTask.projectIdentifier || '',
      });
    }
  }, [projectTask]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setProjectTaskData({
      ...projectTaskData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedProjectTask = {
      id: projectTaskData.id,
      projectSequence: projectTaskData.projectSequence,
      summary: projectTaskData.summary,
      acceptanceCriteria: projectTaskData.acceptanceCriteria,
      status: projectTaskData.status,
      priority: projectTaskData.priority,
      dueDate: formatDateYearFirst(projectTaskData.dueDate),
      projectIdentifier: projectTaskData.projectIdentifier,
    };

    updateProjectTask(backlogId, projectTaskId, updatedProjectTask, navigate);
  };

  return (
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link
              to={`/projectBoard/${projectTaskData.projectIdentifier}`}
              className='btn btn-light'
            >
              <IoIosArrowBack /> Back to Project Board
            </Link>
            <h4 className='display-4 text-center'>Update Project Task</h4>
            <p className='lead text-center'>
              Project Name: {projectTask.projectIdentifier} | Project Task ID:{' '}
              {projectTask.projectSequence}{' '}
            </p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.summary,
                  })}
                  type='text'
                  name='summary'
                  placeholder='Project Task summary'
                  value={projectTaskData.summary}
                  onChange={onChange}
                />
                {errors.summary && (
                  <div className='invalid-feedback'>{errors.summary}</div>
                )}
              </div>
              <div className='form-group mt-2'>
                <textarea
                  className='form-control form-control-lg'
                  placeholder='Acceptance Criteria'
                  name='acceptanceCriteria'
                  value={projectTaskData.acceptanceCriteria}
                  onChange={onChange}
                />
              </div>
              <h6 className='mt-2'>Due Date</h6>
              <div className='form-group mt-2'>
                <input
                  className='form-control form-control-lg'
                  type='date'
                  name='dueDate'
                  value={projectTaskData.dueDate}
                  onChange={onChange}
                />
              </div>
              <div className='form-group mt-2'>
                <select
                  className='form-control form-control-lg'
                  name='priority'
                  value={projectTaskData.priority}
                  onChange={onChange}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className='form-group mt-2'>
                <select
                  className='form-control form-control-lg'
                  name='status'
                  value={projectTaskData.status}
                  onChange={onChange}
                >
                  <option value=''>Select Status</option>
                  <option value='TO_DO'>TO DO</option>
                  <option value='IN_PROGRESS'>IN PROGRESS</option>
                  <option value='DONE'>DONE</option>
                </select>
              </div>

              <input
                className='btn btn-lg btn-success w-100 mt-4'
                type='submit'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projectTask: state.backlog.projectTask,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
