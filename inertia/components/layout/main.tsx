import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '#components/layout/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import type { User } from '#types/user'
import { Header } from '#components/layout/header'
// import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'

export default function Main(props: {
  children: React.ReactNode
  user: User
  title: string
  errors?: string
  success?: string
  fixed?: boolean
}) {
  const { errors, success, fixed } = props
  if (errors) toast.error(errors)
  if (success) toast.success(success)
  return (
    <SearchProvider user={props.user}>
      <SidebarProvider>
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
