import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const NotFound = () => {
  return (
    <div
      className={
        'd-flex flex-column justify-content-center align-items-center mt-5'
      }
    >
      <FaExclamationTriangle className={'text-danger'} size={'5em'} />
      <h1 className={'mt-3'}>404: Page Not Found</h1>
      <p className={'lead'}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to={'/'} className={'btn btn-primary'}>
        Go Back
      </Link>
    </div>
  );
};
