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
    <table className="w-full table-auto bg-gray-500 rounded">
      <thead className="border-b-2 border-gray-400">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-2 text-left">
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
                return <td key={columnIndex} >
                  {
                    column.actions?.map((action) => (
                      <button onClick={() => action.onClick(row)}>{action.label}</button>
                    ))
                  }
                </td>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
