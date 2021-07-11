/* eslint-disable react/prop-types */
import { Layout } from 'antd';

const AppLayout = ({ children }) => (
  <Layout className="site-layout">
    <Layout.Content
      style={{
        margin: '24px 16px 0',
        overflow: 'initial'
      }}
    >
      <div
        className="site-layout-background"
        style={{
          minHeight: 'calc(100vh - 158px)'
        }}
      >
        {children}
      </div>
    </Layout.Content>
  </Layout>
)

export default AppLayout;
