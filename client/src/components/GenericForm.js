import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const GenericForm = (props) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [exercise, setExercise] = useState(false);
  const [error, setError] = useState('');
  const email = useSelector((state) => state.users.email);
  const errors = useSelector((state) => state.errors.error);

  console.log('errors is', errors);

  useEffect(() => {
    setError(errors);
  }, [errors]);

  const onFinish = (values) => {
    // console.log('values are', values);
    if (email.length > 0) {
      values.email = email;
      // console.log('values should include email', values);
    }
    dispatch(props.action(values, props.reDirect));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const showForm = () => {
    return (
      <div>
        <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {props.email && (
            <Form.Item
              type='email'
              label='email'
              name='email'
              rules={[{ required: true, type: 'email', message: 'please insert a valid email' }]}
            >
              <Input />
            </Form.Item>
          )}

          {props.password && (
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {props.confirmPassword && (
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {props.weight && (
            <Form.Item
              label='Weight'
              name='weight'
              rules={[{ required: true, message: 'Please input weight in numbers' }]}
            >
              <InputNumber />
            </Form.Item>
          )}

          {props.comment && (
            <Form.Item
              label='Comment'
              name='comment'
              // rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          )}

          {props.exercise && (
            <Form.Item
              rules={[{ required: true, message: "We're on to you, say it !" }]}
              name='exercise'
              label='Did you exercise?'
              style={{ marginBottom: 20 }}
              colon={false}
            >
              <Radio.Group>
                <Radio value={true} onChange={() => setExercise(true)}>
                  Yes
                </Radio>
                <Radio value={false} onChange={() => setExercise(false)}>
                  No
                </Radio>
              </Radio.Group>
            </Form.Item>
          )}

          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' style={{ borderRadius: '10%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
  return (
    <div>
      <div>
        {errors && <h3 style={{ color: '#ff4d4f' }}>{errors}</h3>}
        {showForm()}
      </div>
    </div>
  );
};

export default GenericForm;
