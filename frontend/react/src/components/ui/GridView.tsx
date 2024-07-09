import React from "react"

type Props = {
  children: React.JSX.Element | React.JSX.Element[]
}

export function GridView({ children }: Props) {
  return <div className="flex h-full flex-col">{children}</div>
}

export function GridViewHeader({ title }: { title: string }) {
  return (
    <section className="flex items-center bg-gray-600 text-white p-4">
      <h1 className="text-xl font-bold">{title}</h1>
    </section>
  )
}

export function GridViewContent({ children }: Props) {
  return (
    <section className="flex-1 overflow-y-auto bg-gray-400 p-4">
      {children}
    </section>
  )
}

export function GridViewFooter({ children }: Props) {
  return (
    <section className="flex justify-end items-center bg-gray-600 p-4 gap-2">{children}</section>
  )
}
