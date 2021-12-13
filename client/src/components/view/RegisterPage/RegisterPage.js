import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: email,
      name: username,
      password: password,
    };

    dispatch(registerUser(body)).then((response) => {
      console.log('tees', registerUser(body));
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        console.log(body);
        alert('Failed to sign up');
      }
    });
  };

  return (
    <Layout>
      <p>Register</p>
      <form onSubmit={onSubmitHandler}>
        <InpBox>
          <label htmlFor=''>Eamil</label>
          <input type='text' value={email} onChange={onEmailHandler} />
        </InpBox>
        <InpBox>
          <label htmlFor=''>Name</label>
          <input type='text' value={username} onChange={onUsernameHandler} />
        </InpBox>
        <InpBox>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            value={password}
            onChange={onPasswordHandler}
          />
        </InpBox>
        <InpBox>
          <label htmlFor=''>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </InpBox>
        <button type='submit'>Send</button>
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

export default RegisterPage;
