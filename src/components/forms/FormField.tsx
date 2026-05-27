import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  helper?: string
  required?: boolean
  children: ReactNode
}

export default function FormField({
  label,
  error,
  helper,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="form-label">
        {label}
        {required ? ' *' : ''}
      </label>
      {helper ? <p className="form-helper">{helper}</p> : null}
      {children}
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  )
}
