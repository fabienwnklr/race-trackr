import { HttpContext } from '@adonisjs/core/http'
import {
  DesktopOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, Space, theme } from 'antd'

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
  getItem('Clients', '/clients', <DesktopOutlined />),
  getItem('Users', '/users', <TeamOutlined />),
  getItem('Settings', 'settings', <SettingOutlined />, [
    getItem('Admin', '/settings/admin', <UserOutlined />),
  ]),
]

const userDropdownItems: MenuItem[] = [
  getItem('Account settings', '/settings/account', <SettingOutlined />),
  getItem('App settings', '/settings/app', <SettingOutlined />),
  getItem('Logout', '/logout', <LogoutOutlined />),
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
            console.log(d)
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
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              {
                path: '',
                title: 'Home',
                onClick: () => console.log('dashboard'),
              },
              {
                path: '',
                title: 'User',
                children: [
                  {
                    path: '',
                    title: 'User1',
                  },
                  {
                    path: '',
                    title: 'User2',
                  },
                ],
              },
            ]}
          ></Breadcrumb>
          <div
            style={{
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
