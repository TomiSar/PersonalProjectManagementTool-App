import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProject, createProject } from '../../actions/projectActions';
import classNames from 'classnames';
import { formatDateDayFirst, formatDateYearFirst } from '../../utils/helpers';
import { IoIosArrowBack } from 'react-icons/io';

function UpdateProject({ getProject, createProject, project, errors }) {
  const [projectData, setProjectData] = useState({
    id: '',
    projectName: '',
    projectIdentifier: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProject(id, navigate);
  }, [getProject, id, navigate]);

  useEffect(() => {
    if (project) {
      setProjectData({
        id: project.id || '',
        projectName: project.projectName || '',
        projectIdentifier: project.projectIdentifier || '',
        description: project.description || '',
        start_date: project.start_date
          ? formatDateDayFirst(project.start_date)
          : '',
        end_date: project.end_date ? formatDateDayFirst(project.end_date) : '',
      });
    }
  }, [project]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      id: projectData.id,
      projectName: projectData.projectName,
      projectIdentifier: projectData.projectIdentifier,
      description: projectData.description,
      start_date: formatDateYearFirst(projectData.start_date),
      end_date: formatDateYearFirst(projectData.end_date),
    };

    createProject(updatedProject, navigate);
  };

  return (
    <div className='project'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link className='btn btn-light' to='/dashboard'>
              <IoIosArrowBack /> Back to Dashboard
            </Link>
            <h5 className='display-4 text-center'>Update Project form</h5>
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
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Unique Project ID'
                  name='projectIdentifier'
                  value={projectData.projectIdentifier}
                  disabled
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
              <h6 className='mt-2'>Start Date</h6>
              <div className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='date'
                  name='start_date'
                  value={projectData.start_date}
                  onChange={onChange}
                />
              </div>
              <h6 className='mt-2'>Estimated End Date</h6>
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

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
