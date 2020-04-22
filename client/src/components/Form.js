import React from 'react';
import GenericForm from './GenericForm';
// import { useSelector } from 'react-redux';
import { addData } from '../actions/index';

const MainForm = (props) => {
  // const authUser = useSelector((state) => state.users);
  return (
    <div id='abc'>
      <div>
        <h1>Enter your data</h1>
      </div>
      <GenericForm exercise weight comment action={addData} reDirect={props.history.push} />
    </div>
  );
};

export default MainForm;
