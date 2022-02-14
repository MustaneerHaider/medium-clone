import { useField } from 'formik'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  textArea?: boolean
  label: string
  name: string
}

function Input({ textArea, label, ...props }: Props) {
  const [field, { error, touched }] = useField(props)

  const hasError = touched && !!error

  return (
    <div className="my-3 flex flex-col">
      <label htmlFor={field.name} className="mb-1 font-semibold">
        {label}
      </label>
      <div
        className={`rounded-sm border border-gray-500 p-1.5 
      ring-blue-400 focus-within:ring-2 ${
        hasError && 'border-red-400 ring-red-400'
      }`}
      >
        {textArea ? (
          <textarea
            rows={5}
            {...field}
            className="w-full bg-transparent outline-none"
          />
        ) : (
          <input
            {...field}
            {...props}
            id={field.name}
            className="w-full bg-transparent outline-none"
          />
        )}
      </div>
      {hasError ? (
        <p className="mt-1 text-[13px] text-red-400">{error}</p>
      ) : null}
    </div>
  )
}

export default Input
