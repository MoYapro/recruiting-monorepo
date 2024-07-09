import { ReactNode } from "react"

export function Button(props: {
  children: ReactNode
  onClick?: () => void
  variant?: "submit" | "cancel"
  formId?: string
}) {
  return (
    <button
      onClick={props.onClick}
      className={`rounded ${props.variant === "cancel" ? "bg-gray-500" : "bg-red-600"} px-2 py-1 text-lg text-white`}
      type={props.variant === "cancel" ? "button" : "submit"}
      form={props.formId}
    >
      {props.children}
    </button>
  )
}
