import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import i18n from '#config/i18n_react'
import { Link, router } from '@inertiajs/react'
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  router.post('/auth/login', {
    email: formData.get('email'),
    password: formData.get('password'),
  })
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>{i18n.t('login_form_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{i18n.t('email')}</Label>
                <Input id="email" type="email" name="email" defaultValue="admin@hotmail.fr" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{i18n.t('password')}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {i18n.t('forgot_password')}
                  </a>
                </div>
                <Input id="password" type="password" name="password" defaultValue="admin" required />
              </div>
              <Button type="submit" className="w-full">
                {i18n.t('login')}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                {i18n.t('login_with_google')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {i18n.t('dont_have_account')}
              <Link href="/register" className="underline underline-offset-4 ml-2">
                {i18n.t('sign_up')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
