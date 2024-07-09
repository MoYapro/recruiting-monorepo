import { Player, PlayerApi } from "@/api"
import { Button } from "@/components/ui/Button.tsx"
import {
  GridView,
  GridViewContent,
  GridViewFooter,
  GridViewHeader,
} from "@/components/ui/GridView.tsx"
import { Input } from "@/components/ui/Input.tsx"
import { isAxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const api = new PlayerApi(undefined, "/api")

async function loadPlayer(username: string) {
  try {
    const response = await api
      .getPlayerByUsername(username)
      .then((res) => res.data)
    return response
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.message)
    }
  }
}

async function savePlayer(player: Player, isEdit: boolean) {
  if (isEdit) {
    await api.updatePlayer(player)
  } else {
    await api.createNewPlayer(player)
  }
}

export function PlayerFormView() {
  const { username } = useParams()
  const [player, setPlayer] = useState<Player>()
  const isEditForm = !!username
  const navigate = useNavigate()

  useEffect(() => {
    loadPlayer(username!).then(setPlayer)
  }, [username])

  return (
    <GridView>
      <GridViewHeader
        title={
          isEditForm
            ? `Edit player with username: ${username}`
            : "Create New Player"
        }
      />
      <GridViewContent>
        <PlayerForm initial={player} />
      </GridViewContent>
      <GridViewFooter>
        <Button onClick={() => navigate(-1)} variant="cancel">
          Cancel
        </Button>
        <Button formId="playerForm">Save</Button>
      </GridViewFooter>
    </GridView>
  )
}

function PlayerForm(props: { initial?: Player }) {
  const [username, setUsername] = useState(props.initial?.username)
  const [displayName, setDisplayName] = useState(props.initial?.displayName)
  const [email, setEmail] = useState(props.initial?.email)
  const [elo, setElo] = useState(props.initial?.elo)

  useEffect(() => {
    if (props.initial) {
      setUsername(props.initial.username)
      setDisplayName(props.initial.displayName)
      setEmail(props.initial.email)
      setElo(props.initial.elo)
    }
  }, [props.initial])

  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await savePlayer({ email, username, elo, displayName }, !!props.initial)
    navigate(-1)
  }

  return (
    <form id="playerForm" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <Input
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Elo"
          name="elo"
          type="number"
          value={elo}
          onChange={(e) => setElo(e.target.valueAsNumber)}
        />
      </div>
    </form>
  )
}
