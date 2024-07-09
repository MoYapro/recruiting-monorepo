import { Match, MatchApi } from "@/api"
import { ColumnDefinition, DataTable } from "@/components/ui/DataTable.tsx"
import {
  GridView,
  GridViewContent,
  GridViewFooter,
  GridViewHeader,
} from "@/components/ui/GridView.tsx"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function MatchesView() {
  const [matches, setMatches] = useState<Match[]>([])
  const matchApi = new MatchApi(undefined, "/api")

  async function fetchMatches() {
    const response = await matchApi.getAllMatches()
    if (response instanceof Error) {
      console.error(response)
      return
    }
    setMatches(response.data)
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const columnDefinitions: Array<ColumnDefinition<Match>> = [
    { label: "ID", type: "DATA", dataProperty: "id" },
    {
      label: "White Player",
      type: "DATA",
      dataProperty: "whitePlayerUsername",
    },
    {
      label: "Black Player",
      type: "DATA",
      dataProperty: "blackPlayerUsername",
    },
    { label: "Outcome", type: "DATA", dataProperty: "outcome" },
  ]
  return (
    <GridView>
      <GridViewHeader title="Match Overview" />
      <GridViewContent>
        <DataTable columns={columnDefinitions} data={matches} />
      </GridViewContent>
      <GridViewFooter>
        <Link
          className="rounded bg-red-600 px-2 py-1 text-lg text-white"
          to="/matches/new"
        >
          Create
        </Link>
      </GridViewFooter>
    </GridView>
  )
}
