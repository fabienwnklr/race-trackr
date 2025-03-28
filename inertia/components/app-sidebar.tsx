import i18n from '#config/i18n_react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link, usePage } from '@inertiajs/react'
import { Home, Calendar, Wrench, Car, Clock, Flag, ShieldUser, ChevronRight } from 'lucide-react'
import type { User } from '#types/user'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { toast } from 'sonner'
import { SearchForm } from './search-form'

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar> & {
    user: User
    title?: string
    success?: string
    errors?: string
  }
) {
  const { user, title, success, errors } = props
  const isAdmin = user.role === 'admin'

  // get current route
  const currentRoute = usePage().url

  if (success) toast.success(success)
  if (errors) toast.error(errors)

  const menuItems = [
    {
      title: i18n.t('dashboard'),
      url: '/dashboard',
      icon: Home,
      active: currentRoute === '/dashboard',
    },
    {
      title: i18n.t('trackdays'),
      url: '/trackdays',
      icon: Calendar,
      active: currentRoute === '/trackdays',
    },
    {
      title: i18n.t('maintenances'),
      url: '/maintenances',
      icon: Wrench,
      active: currentRoute === '/maintenances',
    },
    {
      title: i18n.t('userVehicles'),
      url: '/user-vehicles',
      icon: Car,
      active: currentRoute === '/user-vehicles',
    },
    {
      title: i18n.t('chronos'),
      url: '/chronos',
      icon: Clock,
      active: currentRoute === '/chronos',
    },
  ]

  const adminMenuItems = [
    {
      title: i18n.t('tracks'),
      url: '/admin/tracks',
      icon: Flag,
      active: currentRoute === '/admin/tracks',
    },
    {
      title: i18n.t('vehicles'),
      url: '/admin/vehicles',
      icon: Car,
      active: currentRoute === '/admin/vehicles',
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild isActive={item.active}>
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {isAdmin && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={i18n.t('admin')}>
                        <ShieldUser />
                        <span className="ml-2">{i18n.t('admin')}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {adminMenuItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={item.url}>
                                <item.icon />
                                {item.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
