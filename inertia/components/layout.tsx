import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import type { User } from '#types/user'
import { SiteHeader } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Layout(props: {
  children: React.ReactNode
  user: User
  title: string
  errors?: string
  success?: string
}) {
  const { errors, success } = props
  if (errors) toast.error(errors)
  if (success) toast.success(success)
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" {...props} />
      <SidebarInset>
        <SiteHeader title={props.title} />
        <Toaster />
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:p-6">{props.children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
