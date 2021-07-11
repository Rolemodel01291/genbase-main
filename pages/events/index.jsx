/* eslint-disable no-multi-assign */
import AppLayout from '_components/AppLayout';
import {
  Card, Col, Row, Typography
} from 'antd';
import Link from 'next/link';

const { Text, Title } = Typography;

const EventsList = () => (
  <AppLayout>
    <Title>Events</Title>
    <Card className="mainCard">
      <Title level={2} style={{ textAlign: 'center' }}>
        Choose from our list of events below to get started
      </Title>
      <Row gutter={[16, 16]}>

        <Col span={24} md={12} lg={6}>

          <Link href="/forms/new/50">
            <Card>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>
                AGM
              </Title>
            </Card>
          </Link>

        </Col>
        <Col span={24} md={12} lg={6}>
          <Link href="/activities">
            <Card>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>ESOP</Title>
            </Card>
          </Link>
        </Col>
      </Row>
    </Card>
  </AppLayout>
);

export default EventsList;
