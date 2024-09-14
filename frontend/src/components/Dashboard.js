import { useEffect } from 'react';
import CreateProjectButton from './Project/CreateProjectButton';
import ProjectItem from './Project/ProjectItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';

function Dashboard({ getProjects, project }) {
  const { projects } = project;

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <div className='projects'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            {projects.length < 1 && (
              <div className='alert alert-info text-center' role='alert'>
                <h3 className='fs-4'>Dashboard doesn't have any Projects</h3>
              </div>
            )}
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
