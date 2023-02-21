import React from 'react';

export const Spinner = (props) => {
  return (
    <div className={'d-flex justify-content-center'}>
      <div className={'spinner-border'} role={'status'}>
        <span className={'sr-only'}></span>
      </div>
    </div>
  );
};
