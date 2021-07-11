import {
  Button, Card, Col, Form, notification, Row
} from 'antd';
import FormBuilder from 'antd-form-builder';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

// import Loader from 'react-loader-spinner';

const Cookies = require('js-cookie');

const ManagerLogin = () => {
  const CORPSEC_API_URL = process.env.CORPSEC_API_URL;

  const router = useRouter();

  const handleFinish = (values) => {
    axios.post(`${CMS_API_ENDPOINT}/auth/local`, {
      identifier: values.email,
      password: values.password
    }).then((res) => {
      Cookies.set('jwt', res.data.jwt, { expires: 7 });
      notification.success({
        message: 'Login Succeeded!',
        description: 'Redirecting to editor.'
      });
      router.push('/manager');
    }).catch(() => {
      notification.error({
        message: 'Login Failed!',
        description: 'Please check your login credentials.'
      });
    });
  };

  const meta = {
    fields: [
      {
        key: 'email', label: 'Email', required: true
      },
      {
        key: 'password', label: 'Password', widget: 'password', required: true
      }
    ]
  };

  return (
    <>
      <Row align="center">
        <Col xs={24} md={12} lg={8}>
          <Card
            style={{ width: '100%' }}
            title="Login"
          >
            <Form onFinish={handleFinish}>
              <FormBuilder meta={meta} />
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>

  );
};

export default ManagerLogin;
