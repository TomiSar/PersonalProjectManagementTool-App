import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectTask } from '../../../actions/backlogActions';
import { formatDateYearFirst } from '../../../utils/helpers';
import classNames from 'classnames';

function AddProjectTask({ addProjectTask, errors }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectTaskData, setProjectTaskData] = useState({
    summary: '',
    acceptanceCriteria: '',
    status: '',
    priority: 0,
    dueDate: '',
    projectIdentifier: id,
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setProjectTaskData({
      ...projectTaskData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newProjectTask = {
      summary: projectTaskData.summary,
      acceptanceCriteria: projectTaskData.acceptanceCriteria,
      status: projectTaskData.status,
      priority: projectTaskData.priority,
      dueDate: formatDateYearFirst(projectTaskData.dueDate),
    };

    addProjectTask(projectTaskData.projectIdentifier, newProjectTask, navigate);
  };

  return (
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to={`/projectBoard/${id}`} className='btn btn-light'>
              Back to Project Board
            </Link>
            <h4 className='display-4 text-center'>Add Project Task</h4>
            <p className='lead text-center'>Project Name + Project Code</p>
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

AddProjectTask.propType = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
