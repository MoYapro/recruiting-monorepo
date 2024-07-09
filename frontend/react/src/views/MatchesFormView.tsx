import { MatchApi, Player, PlayerApi } from "@/api"
import { Button } from "@/components/ui/Button.tsx"
import {
  GridView,
  GridViewContent,
  GridViewFooter,
  GridViewHeader,
} from "@/components/ui/GridView.tsx"
import React, { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export enum Outcome {
  WHITE_WINS = "WHITE_WINS",
  BLACK_WINS = "BLACK_WINS",
  DRAW = "DRAW",
}

const api = new PlayerApi(undefined, "/api")

const matchesApi = new MatchApi(undefined, "/api")

async function loadPlayers() {
  return await api.getAllPlayers().then((res) => res.data)
}

export const outcomeOptions = Object.values(Outcome)

export function MatchesFormView() {
  const [players, setPlayers] = useState<Player[]>()
  const [whitePlayer, setWhitePlayer] = useState<string>()
  const [blackPlayer, setBlackPlayer] = useState<string>()
  const [outcome, setOutcome] = useState<Outcome>()

  const navigate = useNavigate()

  useEffect(() => {
    loadPlayers().then(setPlayers)
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await matchesApi.createNewMatch({
      outcome,
      blackPlayerUsername: blackPlayer,
      whitePlayerUsername: whitePlayer,
    })

    navigate(-1)
  }

  return (
    <GridView>
      <GridViewHeader title="Create new Match" />
      <GridViewContent>
        <form id="matchForm" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Dropdown
              label="White Player"
              name="whitePlayer"
              value={whitePlayer}
              onChange={setWhitePlayer}
            >
              {players?.map((player) => (
                <option key={player.username} value={player.username}>
                  {player.displayName}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              label="Display Name"
              name="displayName"
              value={blackPlayer}
              onChange={setBlackPlayer}
            >
              {players?.map((player) => (
                <option key={player.username} value={player.username}>
                  {player.displayName}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              label="Outcome"
              name="outcome"
              value={outcome}
              onChange={(value) => setOutcome(value as Outcome)}
            >
              {outcomeOptions.map((outcome) => (
                <option key={outcome} value={outcome}>
                  {outcome}
                </option>
              ))}
            </Dropdown>
          </div>
        </form>
      </GridViewContent>
      <GridViewFooter>
        <Button onClick={() => navigate(-1)} variant="cancel">
          Cancel
        </Button>
        <Button formId="matchForm">Save</Button>
      </GridViewFooter>
    </GridView>
  )
}

const borderStyles =
  "rounded-t border-b-2 border-t border-t-gray-100 border-r border-r-gray-100 border-l border-l-100 border-b-white"

function Dropdown(props: {
  children: ReactNode
  value: string | undefined
  onChange: (value: string) => void
  label: string
  name: string
}) {
  return (
    <select
      value={props.value ?? "-1"}
      onChange={(e) => props.onChange(e.target.value)}
      name={props.name}
      className={`${borderStyles} bg-gray-700 px-2 py-1 text-lg text-white`}
    >
      <option value="-1" disabled>
        {props.label}
      </option>
      {props.children}
    </select>
  )
}
