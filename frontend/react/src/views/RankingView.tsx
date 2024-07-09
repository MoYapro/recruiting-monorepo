import { RankingApi } from "@/api"
import { ColumnDefinition, DataTable } from "@/components/ui/DataTable.tsx"
import {
  GridView,
  GridViewContent,
  GridViewHeader,
} from "@/components/ui/GridView.tsx"
import { useEffect, useState } from "react"

export function RankingView() {
  const rankingApi = new RankingApi(undefined, "/api")
  const [rankings, setRankings] = useState<RankingFrontend[]>([])

  async function fetchRankings() {
    const response = await rankingApi.getRankings(10)
    if (response instanceof Error) {
      console.error(response)
      return
    }
    setRankings(
      response.data.map((ranking) => ({
        username: ranking.player!.username!,
        displayName: ranking.player!.displayName!,
        email: ranking.player!.email!,
        elo: ranking.player!.elo!,
        rank: ranking.rank!,
      })),
    )
  }

  useEffect(() => {
    fetchRankings()
  }, [])

  const columnDefinitions: Array<ColumnDefinition<RankingFrontend>> = [
    { label: "Rank", type: "DATA", dataProperty: "rank" },
    { label: "Elo", type: "DATA", dataProperty: "elo" },
    { label: "Username", type: "DATA", dataProperty: "username" },
    { label: "Display Name", type: "DATA", dataProperty: "displayName" },
    { label: "Email", type: "DATA", dataProperty: "email" },
  ]

  return (
    <GridView>
      <GridViewHeader title="Ranking Overview" />
      <GridViewContent>
        <DataTable columns={columnDefinitions} data={rankings} />
      </GridViewContent>
    </GridView>
  )
}

export interface RankingFrontend {
  username: string
  displayName: string
  email: string
  elo: number
  rank: number
}
