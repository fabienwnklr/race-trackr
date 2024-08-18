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
import { Avatar, Dropdown, Layout, Menu, Space, theme, Typography } from 'antd'

const { Header, Content, Footer, Sider } = Layout

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
  getItem('Account settings', '/settings/account', <SettingOutlined />),
  getItem('App settings', '/settings/app', <SettingOutlined />),
  getItem(
    <Typography.Link onClick={() => router.post('/auth/logout')}>Logout</Typography.Link>,
    '/logout',
    <LogoutOutlined />
  ),
]

export default function Nav(props: any) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[props]}
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
            justifyContent: 'end',
            alignItems: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
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
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
