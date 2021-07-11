/* eslint-disable no-multi-assign */
import AppLayout from '_components/AppLayout';
import {
  Card, Col, List, Row, Typography
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('/api/activities',
      {
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => {
      const results = res.data.reduce((acc, act) => {
        let curr = acc[act.main] = acc[act.main] || {};
        curr = curr[act.parent] = curr[act.parent] || [];
        curr.push(act);
        return acc;
      }, {});
      setActivities(Object.entries(results));
    });
  }, []);

  return (
    <AppLayout>
      <Title>Dashboard</Title>
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}>Hi Andrew what would you like to do today?</Title>
        {activities.map((main) => (
          <>
            <Title level={4} style={{ textAlign: 'center', margin: '20px 0' }}>{main[0]}</Title>
            <Row gutter={[16, 16]}>
              {
              Object.entries(main[1]).map((parent) => (
                <Col span={24} md={12} lg={6}>
                  <List
                    size="small"
                    header={parent[0]}
                    footer={null}
                    bordered
                    dataSource={parent[1]}
                    renderItem={(item) => (
                      <List.Item>
                        <Row justify="space-between" align="middle">
                          <Col>{item.name}</Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              ))
            }
            </Row>
          </>
        ))}
      </Card>
    </AppLayout>
  );
};

export default ActivitiesList;
