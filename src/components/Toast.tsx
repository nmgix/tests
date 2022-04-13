import React from "react";
import { useTypedSelector } from "../redux/helpers/useTypedSelector";

export const Toast: React.FC<{}> = () => {
  const auth = useTypedSelector((state) => state.auth);

  if (auth.error) {
    return (
      <div className='toast show' role='alert' aria-live='assertive' aria-atomic='true'>
        <div className='toast-header'>
          <img src='...' className='rounded mr-2' alt='...' />
          <strong className='mr-auto'>Bootstrap</strong>
          <small className='text-muted'>just now</small>
          <button type='button' className='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='toast-body'>See? Just like this.</div>
      </div>
    );
  }

  return <></>;
};
