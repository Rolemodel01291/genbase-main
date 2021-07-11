/* eslint-disable no-multi-assign */
import AppLayout from '_components/AppLayout';
import {
  Card, Col, Row, Typography
} from 'antd';
import Link from 'next/link';

const { Text, Title } = Typography;

const Dashboard = () => (
  <AppLayout>
    <Title>Dashboard</Title>
    <Card className="mainCard">
      <Title level={2} style={{ textAlign: 'center' }}>Hi Andrew what would you like to do today?</Title>

      <Row gutter={[16, 16]}>

        <Col offset={6} span={24} md={12} lg={6}>
          <Link href="/events">
            <Card>
              <Title level={3} style={{ textAlign: 'center' }}>Events</Title>
              <Text>
                Choose from our list of key events in your
                company's lifetime
              </Text>
            </Card>
          </Link>
        </Col>
        <Col span={24} md={12} lg={6}>
          <Link href="/activities">
            <Card>
              <Title level={3} style={{ textAlign: 'center' }}>Activities</Title>
              <Text>
                Choose from our list of activities if you need to get something done quickly
              </Text>
            </Card>
          </Link>
        </Col>
      </Row>
    </Card>
  </AppLayout>
);

export default Dashboard;
