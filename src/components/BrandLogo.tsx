import Image from 'next/image'

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'favicon'
  width: number
  height: number
  alt: string
  className?: string
  priority?: boolean
}

const srcByVariant = {
  light: '/brand/elo-logo-white.png',
  dark: '/brand/elo-logo-black.png',
  favicon: '/brand/elo-favicon.svg',
} as const

export default function BrandLogo({
  variant = 'light',
  width,
  height,
  alt,
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={srcByVariant[variant]}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
    />
  )
}
