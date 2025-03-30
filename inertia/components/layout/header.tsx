import React from 'react'
import { Search } from '@/components/search'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeSwitch } from '#components/theme-switch'
import { ProfileDropdown } from '#components/profile-dropdown'
import type { User } from '#types/user'
import { cn } from '@/lib/utils'

export function Header(props: { title: string; user: User, className?: string }) {
  const { title, user, className } = props
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'flex h-16 items-center gap-3 bg-background p-4 sm:gap-4',
        'header-sticky peer/header sticky top-0 z-50 w-[inherit] rounded-md',
        offset > 10 ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Search />
        {/* <ThemeSwitch /> */}
        <ProfileDropdown user={user} />
      </div>
    </header>
  )
}
