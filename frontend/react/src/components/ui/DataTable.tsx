import { Button } from "./Button"

export type ColumnDefinitionAction<D extends Record<string, any>> = {
  label: string
  type: "EDIT"
  onClick: (row: D) => void
}

export type ColumnDefinition<D extends Record<string, any>> = {
  label: string
  type: "DATA" | "ACTION"
  dataProperty?: keyof D
  actions?: Array<ColumnDefinitionAction<D>>
}

interface Props<D extends Record<any, any>> {
  columns: Array<ColumnDefinition<D>>
  data: Array<D>
}

export function DataTable({ columns, data }: Props<any>) {
  return (
    <table className="w-full table-auto rounded">
      <thead className="border-b-2 border-gray-400">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className={`px-2 py-3 text-left`}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => {
              if (column.type === "DATA") {
                return (
                  <td key={columnIndex} className="p-2">
                    {row[column.dataProperty as string]}
                  </td>
                )
              } else {
                return (
                  <td key={columnIndex} className="flex justify-start">
                    {column.actions?.map((action) => (
                      <Button onClick={() => action.onClick(row)}>
                        {action.label}
                      </Button>
                    ))}
                  </td>
                )
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
