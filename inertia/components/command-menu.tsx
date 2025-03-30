import React from 'react'
import { ArrowRight, Laptop, Moon, Sun } from 'lucide-react'
import { useSearch } from '@/context/search-context'
import { useTheme } from '@/context/theme-context'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { menuItems, adminMenuItems } from './layout/data/sidebar_data'
import { ScrollArea } from './ui/scroll-area'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import i18n from '#config/i18n_react'

export function CommandMenu({ user }: { user: User }) {
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const isAdmin = user.role === 'admin'

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  // translate menuItems titles
  menuItems.navGroups.forEach((group) => {
    group.items.forEach((item) => {
      item.title = i18n.t(item.title)
    })
  })
  // translate adminMenuItems titles
  adminMenuItems.navGroups.forEach((group) => {
    group.items.forEach((item) => {
      item.title = i18n.t(item.title)
    })
  })

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={i18n.t('command_menu')} />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {menuItems.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => router.get(navItem.url))
                      }}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )

                // return navItem.items?.map((subItem, i) => (
                //   <CommandItem
                //     key={`${subItem.url}-${i}`}
                //     value={subItem.title}
                //     onSelect={() => {
                //       runCommand(() => navigate({ to: subItem.url }))
                //     }}
                //   >
                //     <div className="mr-2 flex h-4 w-4 items-center justify-center">
                //       <ArrowRight className="size-2 text-muted-foreground/80" />
                //     </div>
                //     {subItem.title}
                //   </CommandItem>
                // ))
              })}
            </CommandGroup>
          ))}
          {isAdmin &&
            adminMenuItems.navGroups.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => runCommand(() => router.get(subItem.url))}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <ArrowRight className="size-2 text-muted-foreground/80" />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
