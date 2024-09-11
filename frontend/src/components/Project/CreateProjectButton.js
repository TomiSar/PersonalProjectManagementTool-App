import { Link } from 'react-router-dom';

function CreateProjectButton() {
  return (
    <>
      <Link className='btn btn-lg btn-primary' to='/addProject'>
        Create a Project
      </Link>
    </>
  );
}

export default CreateProjectButton;
