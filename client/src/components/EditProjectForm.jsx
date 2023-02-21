import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please fill in all fields');
    }
    await updateProject(name, description, status);

    setName(name);
    setDescription(description);
    setStatus(status);
  };

  return (
    <div className={'mt-5'}>
      <form onSubmit={onSubmit}>
        <div className={'mb-3'}>
          <label htmlFor={'name'} className={'form-label'}>
            Name
          </label>
          <input
            type={'text'}
            className={'form-control'}
            id={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={'mb-3'}>
          <label htmlFor={'description'} className={'form-label'}>
            Description
          </label>
          <textarea
            className={'form-control'}
            id={'description'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={'mb-3'}>
          <label htmlFor={'status'} className={'form-label'}>
            Status
          </label>
          <select
            className={'form-select'}
            id={'status'}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={'new'}>Not Started</option>
            <option value={'progress'}>In Progress</option>
            <option value={'completed'}>Completed</option>
          </select>
        </div>
        <button type={'submit'} className={'btn btn-primary'}>
          Submit
        </button>
      </form>
    </div>
  );
};
