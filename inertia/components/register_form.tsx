import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, router } from '@inertiajs/react'
import i18n from '#config/i18n_react'

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  router.post('/auth/register', {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  })
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex h-screen', className)} {...props}>
      {/* Illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="first_name">{i18n.t('first_name')}</Label>
              <Input
                id="first_name"
                type="text"
                name="first_name"
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">{i18n.t('last_name')}</Label>
              <Input
                id="last_name"
                type="text"
                name="last_name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">{i18n.t('email')}</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{i18n.t('password')}</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            <div>
              <Label htmlFor="password_confirmation">{i18n.t('confirm_password')}</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {i18n.t('register')}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              {i18n.t('register_with_google')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {i18n.t('already_have_account')}
            <Link href="/login" className="underline underline-offset-4 ml-2">
              {i18n.t('login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
