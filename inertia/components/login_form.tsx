import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
        <div className="w-full p-6 ">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{i18n.t('email')}</Label>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue="admin@hotmail.fr"
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{i18n.t('password')}</Label>
              <Input id="password" type="password" name="password" defaultValue="admin" required />
            </div>
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
        </div>
      </div>
    </div>
  )
}
