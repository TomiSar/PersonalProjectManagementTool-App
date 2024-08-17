import { useState } from 'react';

function AddProject() {
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectIdentifier: '',
    description: '',
    start_date: '',
    end_date: '',
  });

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
    console.log(newProject);
  };

  return (
    // check name attribute input fields
    // create constructor
    // set state
    // set value on input fields
    // create onChange function
    // set onChange on each input field
    // bind on constructor
    // check state change in the react extension

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
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Project Name'
                  name='projectName'
                  value={projectData.projectName}
                  onChange={onChange}
                />
              </div>
              <div className='form-group mt-2'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Unique Project ID'
                  name='projectIdentifier'
                  value={projectData.projectIdentifier}
                  onChange={onChange}
                />
              </div>
              <div className='form-group mt-2'>
                <textarea
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Project Description'
                  name='description'
                  value={projectData.description}
                  onChange={onChange}
                />
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
              <input className='btn btn-primary btn-block mt-4' type='submit' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
