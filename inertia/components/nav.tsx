import {
  ToolOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown, Grid, Layout, Menu, Space, theme, Typography } from 'antd'

const { Header, Content, Footer, Sider } = Layout
const { useBreakpoint } = Grid

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const asideNavItems: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <DashboardOutlined />),
  getItem('Trackdays', '/trackdays', <CalendarOutlined />),
  getItem('Maintenances ', '/maintenances', <ToolOutlined />),
  getItem('Chronos', '/chronos', <FieldTimeOutlined />),
]

const userDropdownItems: MenuItem[] = [
  getItem('Account settings', '/settings/account', <UserOutlined />),
  getItem('App settings', '/settings/app', <SettingOutlined />),
  getItem(
    <Typography.Link onClick={() => router.post('/auth/logout')}>Logout</Typography.Link>,
    '/logout',
    <LogoutOutlined />
  ),
]

export default function Nav({
  route,
  children,
}: {
  route: string
  children: React.ReactNode | React.ReactNode[]
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const screens = useBreakpoint()
  console.log(screens)
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[route]}
          mode="inline"
          items={asideNavItems}
          onSelect={(d) => {
            router.visit(d.key)
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <Typography.Title level={3}>Trackday Data Management</Typography.Title>
          <Dropdown menu={{ items: userDropdownItems }} trigger={['click']}>
            <Avatar
              style={{
                cursor: 'pointer',
                boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 10px 2px',
              }}
              size={'large'}
            >
              <Space>F</Space>
            </Avatar>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              margin: '16px 0',
              padding: 24,
              minHeight: 360,
              maxHeight: '100%',
              overflow: 'auto',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
