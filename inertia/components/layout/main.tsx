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
  FlagOutlined,
  KeyOutlined,
} from '@ant-design/icons'
import { router } from '@inertiajs/react'
import {
  Avatar,
  Dropdown,
  Layout,
  Menu,
  notification,
  Select,
  Space,
  theme,
  Typography,
} from 'antd'
import { useState } from 'react'

import type { MenuItem } from '#types/menu'
import type { User } from '#types/user'
import { VehiclesIcon } from '#components/icons/vehicles'

const { Header, Content, Footer, Sider } = Layout

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

async function setLocale(locale: string) {
  i18n.changeLanguage(locale)
  window.location.reload()
}

/**
 * Nav is main component, including container layout
 */
export default function Main(props: {
  route: string
  children: React.ReactNode | React.ReactNode[]
  user: User
  title?: string
  success?: string
  errors?: string
}) {
  const [collapsed, _setCollapsed] = useState(false)
  const { route, children, user, title, success, errors } = props
  const isAdmin = user.role === 'admin'
  let stateSubMenu = ['']

  if (isAdmin && !collapsed) stateSubMenu = ['admin-submenu']
  const [stateOpenKeys, _setStateOpenKeys] = useState(stateSubMenu)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  notification.config({
    placement: 'bottomRight',
    bottom: 50,
    duration: 5,
  })

  if (success) {
    notification.success({ message: success })
  }

  if (errors) {
    notification.error({ message: errors })
  }

  const asideNavItems: MenuItem[] = [
    getItem(i18n.t('dashboard'), '/dashboard', <DashboardOutlined />),
    getItem(i18n.t('trackdays'), '/trackdays', <CalendarOutlined />),
    getItem(i18n.t('maintenances'), '/maintenances', <ToolOutlined />),
    getItem(i18n.t('userVehicles'), '/user-vehicles', <VehiclesIcon />),
    getItem(i18n.t('chronos'), '/chronos', <FieldTimeOutlined />),
  ]

  const adminNavItems: MenuItem[] = Array.prototype.concat(asideNavItems, [
    getItem(i18n.t('admin'), 'admin-submenu', <PropertySafetyOutlined />, [
      getItem(i18n.t('tracks'), '/admin/tracks', <FlagOutlined />),
      getItem(i18n.t('vehicles'), '/admin/vehicles', <CarOutlined />),
    ]),
  ])

  const userDropdownItems: MenuItem[] = [
    getItem(i18n.t('myAccount'), '/settings/account', <UserOutlined />),
    // getItem(<Typography.Link>{i18n.t('app_settings')}</Typography.Link>, '', <SettingOutlined />),
    // getItem(
    //   <Typography.Link onClick={() => router.visit('/api_key')}>
    //     {i18n.t('apiKeys')}
    //   </Typography.Link>,
    //   '/api_key',
    //   <KeyOutlined />
    // ),
    getItem(
      <Typography.Link onClick={() => router.post('/auth/logout')}>
        {i18n.t('logout')}
      </Typography.Link>,
      '/logout',
      <LogoutOutlined />
    ),
  ]

  const locale = i18n.language

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" style={siderStyle} collapsible collapsed={collapsed}>
        <Menu
          selectedKeys={[route]}
          defaultOpenKeys={stateOpenKeys}
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
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> */}
          <img
            src={'/resources/images/logos/logo_seul_light.png'}
            alt="logo"
            style={{ width: 'auto', height: '64px', marginLeft: '20px' }}
          />
          <Typography.Title level={3}>Race Trackr</Typography.Title>

          <Space>
            <Select
              value={locale}
              style={{ width: 120 }}
              onChange={(value) => {
                setLocale(value)
              }}
              options={[
                { value: 'fr', label: 'FR - Français' },
                // { value: 'en', label: 'EN - English' },
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
        <Content
          style={{
            padding: 24,
            minHeight: 360,
            maxHeight: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {title && (
            <Typography.Title
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 34,
              }}
              level={3}
            >
              {title}
            </Typography.Title>
          )}
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Race Trackr ©2023 {i18n.t('createdBy')} <a href="https://fabienwinkler.fr">Fabien</a>{' '}
          {i18n.t('member_of_team')} <a href="#">FRT</a>
        </Footer>
      </Layout>
    </Layout>
  )
}
