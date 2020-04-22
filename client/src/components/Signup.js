import React from 'react';
import GenericForm from './GenericForm';
import { signup } from '../actions/usersActions';

const Signup = (props) => {
  return (
    <div style={{ margin: 20 }}>
      <h1>Register</h1>
      <GenericForm email password confirmPassword action={signup} reDirect={props.history.push} />
    </div>
  );
};

export default Signup;
