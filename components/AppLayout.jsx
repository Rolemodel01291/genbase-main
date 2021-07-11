/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const {
  Header, Content, Footer
} = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();

  const href = router.pathname.replace('/', '');

  const menuOpts = {
    defaultSelectedKeys: [href],
    selectedKeys: [href]
  };

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          {...menuOpts}
        >
          <Menu.Item key="dashboard">
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="subsidiaries">
            <Link href="/subsidiaries">Subsidiaries</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link href="/users">Users</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 84 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default AppLayout;
