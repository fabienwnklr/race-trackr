import {
  ToolOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  PropertySafetyOutlined,
  CarOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Grid, Layout, Menu, Modal, Space, theme, Typography } from 'antd'
import { useState } from 'react'

interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

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

/**
 * Nav is main component, including container layout
 */
export default function Nav(props: {
  route: string
  children: React.ReactNode | React.ReactNode[]
  user: any
}) {
  const { route, children, user } = props
  const isAdminSubmenu = route.match('/admin') !== null
  let stateSubMenu = ['']
  if (isAdminSubmenu) stateSubMenu = ['admin-submenu']

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stateOpenKeys, setStateOpenKeys] = useState(stateSubMenu)
  const isAdmin = user.role === 'admin'
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const screens = useBreakpoint()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {}
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level
        }
        if (item.children) {
          func(item.children, level + 1)
        }
      })
    }
    func(items1)
    return key
  }

  const asideNavItems: MenuItem[] = [
    getItem('Dashboard', '/dashboard', <DashboardOutlined />),
    getItem('Trackdays', '/trackdays', <CalendarOutlined />),
    getItem('Maintenances ', '/maintenances', <ToolOutlined />),
    getItem('Chronos', '/chronos', <FieldTimeOutlined />),
  ]

  const adminNavItems: MenuItem[] = Array.prototype.concat(asideNavItems, [
    getItem('Admin', 'admin-submenu', <PropertySafetyOutlined />, [
      getItem(
        'Tracks',
        '/admin/tracks',
        <Button size="small">
          <PlusCircleOutlined />
        </Button>
      ),
      getItem('Vehicles', '/admin/vehicles', <CarOutlined />),
    ]),
  ])

  const userDropdownItems: MenuItem[] = [
    getItem('Account settings', '/settings/account', <UserOutlined />),
    getItem(
      <Typography.Link
        onClick={() => {
          showModal()
        }}
      >
        App settings
      </Typography.Link>,
      '',
      <SettingOutlined />
    ),
    getItem(
      <Typography.Link onClick={() => router.post('/auth/logout')}>Logout</Typography.Link>,
      '/logout',
      <LogoutOutlined />
    ),
  ]

  const levelKeys = getLevelKeys(adminNavItems as LevelKeysProps[])

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1)
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      // close
      setStateOpenKeys(openKeys)
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[route]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={isAdmin ? adminNavItems : asideNavItems}
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
          <Modal
            title="App settings"
            open={isModalOpen}
            onOk={() => {
              hideModal()
            }}
            onCancel={() => {
              hideModal()
            }}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
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
