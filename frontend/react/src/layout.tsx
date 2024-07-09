import Chess from "@/assets/iits-cec.svg"
import React from "react"
import { Link, Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="grid h-full grid-cols-[300px_auto] grid-rows-[4rem_auto]">
      <header className="col-span-2 flex items-center gap-2 bg-red-300 text-2xl font-bold text-red-600">
        <img src={Chess} className="h-16 w-16" />
        Chess Elo Calculator
      </header>
      <nav className="bg-gray-300">
        <ul className="flex flex-col gap-4 p-2">
          <NavLink to={"/players/overview"}>Players</NavLink>
          <NavLink to={"/matches/overview"}>Matches</NavLink>
          <NavLink to={"/ranking/overview"}>Ranking</NavLink>
        </ul>
      </nav>
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

function NavLink(props: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={props.to}>
        <div className="rounded px-4 py-3 hover:bg-gray-400">
          {props.children}
        </div>
      </Link>
    </li>
  )
}
