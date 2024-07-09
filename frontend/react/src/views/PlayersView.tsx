import { Player, PlayerApi } from "@/api"
import { ColumnDefinition, DataTable } from "@/components/ui/DataTable.tsx"
import {
  GridView,
  GridViewContent,
  GridViewFooter,
  GridViewHeader,
} from "@/components/ui/GridView.tsx"
import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom";

export function PlayersGridView() {
  const api = new PlayerApi(undefined, "/api")
  const [players, setPlayers] = useState<Player[]>([])
  const navigate = useNavigate()

  async function fetchPlayers() {
    const response = await api.getAllPlayers()
    if (response instanceof Error) {
      console.error(response)
      return
    }
    setPlayers(response.data)
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const columnDefinitions: Array<ColumnDefinition<Player>> = [
    { label: "Username", type: "DATA", dataProperty: "username" },
    { label: "Display Name", type: "DATA", dataProperty: "displayName" },
    { label: "Email", type: "DATA", dataProperty: "email" },
    {
      label: "Actions",
      type: "ACTION",
      actions: [{ label: "Edit", type: "EDIT", onClick: player => navigate(`/players/${player.username}/edit`)  }],
    },
  ]

  return (
    <GridView>
      <GridViewHeader title="Player Overview" />
      <GridViewContent>
        <DataTable columns={columnDefinitions} data={players} />
      </GridViewContent>
      <GridViewFooter>
        <Link className="rounded bg-red-600 px-2 py-1 text-lg text-white" to="/players/new">Create</Link>
      </GridViewFooter>
    </GridView>
  )
}
