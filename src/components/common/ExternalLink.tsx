interface Props {
  href: string | null | undefined
  label: string
  className?: string
}

export function ExternalLink({ href, label, className = '' }: Props) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sky-600 hover:underline text-sm ${className}`}
    >
      {label}
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 10L10 2M6 2h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
