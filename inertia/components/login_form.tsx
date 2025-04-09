import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import i18n from '#config/i18n_react'
import { Link, router } from '@inertiajs/react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  router.post('/auth/login', {
    email: formData.get('email'),
    password: formData.get('password'),
  })
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@hotmail.fr',
      password: 'admin',
    },
  })

  return (
    <div className={cn('flex h-screen', className)} {...props}>
      {/* Illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img
          src="https://source.unsplash.com/600x800/?sports,fitness"
          alt="Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.t('email')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" required placeholder={i18n.t('name')} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.t('password')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" required placeholder={i18n.t('password')} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {i18n.t('login')}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                {i18n.t('login_with_google')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {i18n.t('dont_have_account')}
              <Link href="/register" className="underline underline-offset-4 ml-2">
                {i18n.t('sign_up')}
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
