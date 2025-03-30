import {
  Calendar,
  Car,
  Clock,
  Flag,
  Home,
  Wrench,
  User,
  Cog,
  Palette,
  AlertCircle,
  MonitorCheck,
} from 'lucide-react'

export const menuItems = {
  navGroups: [
    {
      title: 'general',
      items: [
        {
          title: 'dashboard',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'trackdays',
          url: '/trackdays',
          icon: Calendar,
        },
        {
          title: 'maintenances',
          url: '/maintenances',
          icon: Wrench,
        },
        {
          title: 'userVehicles',
          url: '/user-vehicles',
          icon: Car,
        },
        {
          title: 'chronos',
          url: '/chronos',
          icon: Clock,
        },
      ],
    },
    {
      title: 'settings',
      items: [
        {
          title: 'profile',
          url: '/settings',
          icon: User,
        },
        {
          title: 'Account',
          url: '/settings/account',
          icon: Cog,
        },
        {
          title: 'Appearance',
          url: '/settings/appearance',
          icon: Palette,
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          icon: AlertCircle,
        },
        {
          title: 'Display',
          url: '/settings/display',
          icon: MonitorCheck,
        },
      ],
    },
  ],
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/01.png',
  },
}

export const adminMenuItems = {
  navGroups: [
    {
      title: 'admin',
      items: [
        {
          title: 'tracks',
          url: '/admin/tracks',
          icon: Flag,
        },
        {
          title: 'vehicles',
          url: '/admin/vehicles',
          icon: Car,
        },
      ],
    },
  ],
}
