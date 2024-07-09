import { MatchesFormView } from "@/views/MatchesFormView.tsx"
import { MatchesView } from "@/views/MatchesView.tsx"
import { PlayerFormView } from "@/views/PlayerFormView.tsx"
import { PlayersGridView } from "@/views/PlayersView.tsx"
import { RankingView } from "@/views/RankingView.tsx"
import { createBrowserRouter, redirect } from "react-router-dom"
import { Layout } from "./layout.tsx"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/players",
        children: [
          {
            path: "",
            loader: () => redirect("/players/overview"),
          },
          {
            path: "overview",
            element: <PlayersGridView />,
          },
          {
            path: ":playerName/edit",
            element: <PlayerFormView />,
          },
          {
            path: "new",
            element: <PlayerFormView />,
          },
        ],
      },
      {
        path: "/matches",
        children: [
          {
            path: "",
            loader: () => redirect("/matches/overview"),
          },
          {
            path: "overview",
            element: <MatchesView />,
          },
          {
            path: "new",
            element: <MatchesFormView />,
          },
        ],
      },
      {
        path: "/ranking",
        children: [
          {
            path: "",
            loader: () => redirect("/ranking/overview"),
          },
          {
            path: "overview",
            element: <RankingView />,
          },
        ],
      },
      {
        path: "*",
        loader: () => redirect("/players/overview"),
      },
    ],
  },
])
