import React from "react";
import LoaderSpinner from "../../resources/loader-spinner.gif";
import "./_loader.scss";

export const Loader = () => {
  return (
    <div className='loader'>
      <img src={LoaderSpinner} alt='loader' />
    </div>
  );
};
