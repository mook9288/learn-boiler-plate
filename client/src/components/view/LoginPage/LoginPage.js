import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <Layout>
      <p>Login</p>
      <form onSubmit={onSubmitHandler}>
        <InpBox>
          <label htmlFor=''>Eamil</label>
          <input type='text' value={email} onChange={onEmailHandler} />
        </InpBox>
        <InpBox>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            value={password}
            onChange={onPasswordHandler}
          />
        </InpBox>
        <button type='submit'>Login</button>
      </form>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 auto;
  width: 180px;

  p {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  form {
    margin-top: 40px;
  }

  button {
    margin-top: 30px;
    width: 100%;
    height: 30px;
    line-height: 28px;
    border: 1px solid #333;
  }
`;

const InpBox = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 20px;
  }

  label {
    margin-bottom: 8px;
  }
  input {
    padding: 4px 8px;
    font-size: 16px;
  }
`;

export default LoginPage;
