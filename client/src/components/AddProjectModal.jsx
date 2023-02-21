import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';

export const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState('');

  // Add project mutation
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    await addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type={'button'}
            className={'btn btn-primary'}
            data-bs-toggle={'modal'}
            data-bs-target={'#addProjectModal'}
          >
            <div className={'d-flex align-items-center'}>
              <FaList className={'icon'} />
              <div>New Project</div>
            </div>
          </button>

          <div
            className={'modal fade'}
            id={'addProjectModal'}
            aria-labelledby={'addProjectModalLabel'}
            aria-hidden={'true'}
          >
            <div className={'modal-dialog'}>
              <div className={'modal-content'}>
                <div className={'modal-header'}>
                  <h5 className={'modal-title'} id={'addProjectModalLabel'}>
                    Add New Project
                  </h5>
                  <button
                    type={'button'}
                    className={'btn-close'}
                    data-bs-dismiss={'modal'}
                    aria-label={'Close'}
                  ></button>
                </div>
                <div className={'modal-body'}>
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
                    <div className={'mb-3'}>
                      <label htmlFor={'clientId'} className={'form-label'}>
                        Client
                      </label>
                      <select
                        className={'form-select'}
                        id={'clientId'}
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value={''}>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type={'submit'}
                      className={'btn btn-primary'}
                      data-bs-dismiss={'modal'}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
