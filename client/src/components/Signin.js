import React from 'react';
import { NavLink } from 'react-router-dom';
import GenericForm from './GenericForm';
import { signin } from '../actions/usersActions';

const Signin = (props) => {
  return (
    <div style={{ margin: 30 }}>
      <GenericForm email password action={signin} reDirect={props.history.push} />
      <h3>
        Dont have an account ? sign up <NavLink to='/signup'>Here</NavLink>
      </h3>
    </div>
  );
};

export default Signin;
