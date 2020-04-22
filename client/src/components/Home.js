import React, { useEffect, useState } from 'react';
import { getData } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Spin, Alert } from 'antd';
import './comp.css';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState('');
  // const [errors, setErrors] = useState(false);
  const st = useSelector((state) => state.data);
  const errorsFromRedux = useSelector((state) => state.errors.error);
  const userEmailFromRedux = useSelector((state) => state.users.email);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    async function asyncFunc() {
      // await dispatch(getData(userEmailFromRedux));
      await dispatch(getData());

      setLoading(false);
    }
    asyncFunc();
  }, [dispatch]);

  const showEmo = async () => {
    // const rank = st.data.length || 1;
    // const res = await axios.get(
    //   `https://mgywp5jk64.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${rank}`
    // );
    // console.log('res is', res);
    // setEmoji(res.data.input);
    st.data.map((data) => {
      return data.gap_from_yesterday < 0 ? (data.feeling = '😁') : (data.feeling = '😢');
    });
  };
  st.data && st.data.length > 0 && showEmo() && console.log(st.data);

  const showError = () => {
    return <Alert message='an Issue has occurred' description={errorsFromRedux} type='error' />;
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'fullDate',
      key: 'fullDate',
    },
    {
      title: 'Day of week',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Gap from yesterday',
      dataIndex: 'gap_from_yesterday',
      key: 'yesterday_gap',
    },
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
    },
    {
      title: 'Gap_from_beginning',
      dataIndex: 'gap_from_beginning',
      key: 'beginning_gap',
    },
    {
      title: 'comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'feeling',
      dataIndex: 'feeling',
      key: 'feeling',
    },
  ];

  return (
    <div style={{ margin: 30 }}>
      <h1>Home {emoji}</h1>
      {loading ? (
        <Spin size='large' className='spinner' />
      ) : errorsFromRedux ? (
        <h1>{showError()}</h1>
      ) : (
        <div>
          {st.data && st.data.length > 0 && (
            <Table
              rowClassName={(record, index) => (record.gap_from_yesterday < 0 ? 'lost' : 'gained')}
              bordered
              scroll
              pagination={false}
              rowKey={(record) => Math.random()}
              columns={columns}
              dataSource={st.data}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
