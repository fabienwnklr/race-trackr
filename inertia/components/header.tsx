import { SidebarIcon } from 'lucide-react'
import { SearchForm } from '@/components/search-form'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { usePage } from '@inertiajs/react'

export function SiteHeader(props: { title: string }) {
  const { title } = props

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background py-2 rounded-t-full">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-base font-medium">{title}</h1>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  )
}
