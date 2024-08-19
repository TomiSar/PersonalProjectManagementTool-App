import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

function AddProject({ createProject, errors }) {
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectIdentifier: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: projectData.projectName,
      projectIdentifier: projectData.projectIdentifier,
      description: projectData.description,
      start_date: projectData.start_date,
      end_date: projectData.end_date,
    };

    createProject(newProject, navigate);
  };

  return (
    <div>
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>
                Create / Edit Project form
              </h5>
              <hr />
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.projectName,
                    })}
                    type='text'
                    placeholder='Project Name'
                    name='projectName'
                    value={projectData.projectName}
                    onChange={onChange}
                  />
                  {errors.projectName && (
                    <div className='invalid-feedback'>{errors.projectName}</div>
                  )}
                </div>
                <div className='form-group mt-2'>
                  <input
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.projectIdentifier,
                    })}
                    type='text'
                    placeholder='Unique Project ID'
                    name='projectIdentifier'
                    value={projectData.projectIdentifier}
                    onChange={onChange}
                  />
                  {errors.projectIdentifier && (
                    <div className='invalid-feedback'>
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                <div className='form-group mt-2'>
                  <textarea
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.description,
                    })}
                    placeholder='Project Description'
                    name='description'
                    value={projectData.description}
                    onChange={onChange}
                  />
                  {errors.description && (
                    <div className='invalid-feedback'>{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='date'
                    name='start_date'
                    value={projectData.start_date}
                    onChange={onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='date'
                    name='end_date'
                    value={projectData.end_date}
                    onChange={onChange}
                  />
                </div>
                <input
                  className='btn btn-primary btn-block mt-4'
                  type='submit'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);
