import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello').then((response) => console.log(response.data));
  }, []);

  const onClickHanndler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃 하는데 실패 했습니다.');
      }
    });
  };
  return (
    <Layout>
      <p>LandingPage</p>
      <button onClick={onClickHanndler}>로그아웃</button>
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

  button {
    margin-top: 30px;
    width: 100%;
    height: 30px;
    line-height: 28px;
    border: 1px solid #333;
  }
`;

export default LandingPage;
