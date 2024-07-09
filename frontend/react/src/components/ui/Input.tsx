import React from "react"

const borderStyles =
  "rounded-t border-b-2 border-t border-t-gray-100 border-r border-r-gray-100 border-l border-l-100 border-b-white"

export function Input(props: {
  name: string
  label: string
  value: string | number | undefined
  type?: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      placeholder={props.label}
      className={`${borderStyles} bg-gray-700 px-2 py-1 text-lg`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
    />
  )
}
