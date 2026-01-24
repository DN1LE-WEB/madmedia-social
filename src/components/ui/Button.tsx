import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  disabled,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg'
  const variants = {
    primary: 'bg-primary text-background hover:bg-accent',
    secondary: 'border border-primary text-primary hover:bg-primary hover:text-background'
  }
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const styles = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`.trim()

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
