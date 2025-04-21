import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '#components/layout/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import type { User } from '#types/user'
import { Header } from '#components/layout/header'
// import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { getCookie } from '@/lib/cookie'
import { useEffect } from 'react'
export default function Main(props: {
  children: React.ReactNode
  user: User
  title: string
  errors?: string
  success?: string
  infos?: string
  neutral?: string
}) {
  const defaultOpen = getCookie('sidebar_state') === 'true'
  const { errors, success, infos, neutral } = props

  useEffect(() => {
    if (errors) {
      toast.error(errors, {
        position: 'top-right',
        closeButton: true,
        style: {
          background: 'var(--color-error-light)',
        },
      })
    }
    if (success) {
      toast.success(success, {
        position: 'top-right',
        closeButton: true,
        style: {
          background: 'var(--color-success-light)',
        },
      })
    }

    if (infos) {
      toast.info(infos, {
        position: 'top-right',
        closeButton: true,
        style: {
          background: 'var(--color-info-light)',
        },
      })
    }

    if (neutral) {
      toast(neutral, {
        position: 'top-right',
        closeButton: true,
      })
    }
  })
  return (
    <SearchProvider user={props.user}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...props} />
        <SidebarInset>
          <Header title={props.title} user={props.user} />
          <Toaster />
          <main
            className={cn(
              // 'peer-[.header-sticky]/header:mt-15',
              'px-4 py-6',
              'fixed-main flex flex-grow flex-col overflow-hidden'
            )}
            {...props}
          />
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}
