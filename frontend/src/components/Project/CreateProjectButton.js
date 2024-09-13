import { Link } from 'react-router-dom';
import { GoProjectRoadmap } from 'react-icons/go';

function CreateProjectButton() {
  return (
    <>
      <Link className='btn btn-lg btn-primary' to='/addProject'>
        <GoProjectRoadmap className='m-1' /> Create new Project
      </Link>
    </>
  );
}

export default CreateProjectButton;
