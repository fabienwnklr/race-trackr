import i18n from '#config/i18n_react'
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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Modal,
  Select,
  Space,
  theme,
  Typography,
} from 'antd'
import { useState } from 'react'
import type { LevelKeysProps, MenuItem } from '#types/menu'

const { Header, Content, Footer, Sider } = Layout
const { useBreakpoint } = Grid

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
}

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
export default function Main(props: {
  route: string
  children: React.ReactNode | React.ReactNode[]
  user: any
}) {
  const [collapsed, setCollapsed] = useState(false)
  const { route, children, user } = props
  const isAdminSubmenu = route.match('/admin') !== null
  let stateSubMenu = ['']
  if (isAdminSubmenu && !collapsed) stateSubMenu = ['admin-submenu']

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stateOpenKeys, setStateOpenKeys] = useState(stateSubMenu)
  const isAdmin = user.role === 'admin'
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const screens = useBreakpoint()

  // if (!collapsed && (screens.sm || screens.xs)) {
  //   setCollapsed(true)
  // }

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
    getItem(i18n.t('dashboard'), '/dashboard', <DashboardOutlined />),
    getItem(i18n.t('trackdays'), '/trackdays', <CalendarOutlined />),
    getItem(i18n.t('maintenances'), '/maintenances', <ToolOutlined />),
    getItem(i18n.t('chronos'), '/chronos', <FieldTimeOutlined />),
  ]

  const adminNavItems: MenuItem[] = Array.prototype.concat(asideNavItems, [
    getItem(i18n.t('admin'), 'admin-submenu', <PropertySafetyOutlined />, [
      getItem(
        i18n.t('tracks'),
        '/admin/tracks',
        <Button size="small">
          <PlusCircleOutlined />
        </Button>
      ),
      getItem(i18n.t('vehicles'), '/admin/vehicles', <CarOutlined />),
    ]),
  ])

  const userDropdownItems: MenuItem[] = [
    getItem(i18n.t('account_settings'), '/settings/account', <UserOutlined />),
    getItem(
      <Typography.Link
        onClick={() => {
          showModal()
        }}
      >
        {i18n.t('app_settings')}
      </Typography.Link>,
      '',
      <SettingOutlined />
    ),
    getItem(
      <Typography.Link onClick={() => router.post('/auth/logout')}>
        {i18n.t('logout')}
      </Typography.Link>,
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

  const locale = i18n.language

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" style={siderStyle} collapsible collapsed={collapsed}>
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
            paddingLeft: '0',
            paddingRight: '20px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Typography.Title level={3}>Trackday Data Management</Typography.Title>

          <Space>
            <Select
              value={locale}
              style={{ width: 120 }}
              onChange={(value) => {
                i18n.changeLanguage(value)
                window.location.reload()
              }}
              options={[
                { value: 'en', label: 'EN - English' },
                { value: 'fr', label: 'FR - Français' },
              ]}
            />
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
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Modal
            title={i18n.t('app_settings')}
            open={isModalOpen}
            onOk={() => {
              hideModal()
            }}
            onCancel={() => {
              hideModal()
            }}
          ></Modal>
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
          TDM ©2023 {i18n.t('created_by')} <a href="https://fabienwinkler.fr">Fabien</a>{' '}
          {i18n.t('member_of_team')} <a href="#">FRT</a>
        </Footer>
      </Layout>
    </Layout>
  )
}