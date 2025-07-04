import { writeFile } from 'node:fs/promises'

export async function exportToCSV<T>(
  name: string,
  columns: string[],
  data: T[]
): Promise<{ success: boolean; filename?: string }> {
  if (!name || !columns || !data) {
    return {
      success: false,
      filename: undefined,
    }
  }
  const csvContent = [
    columns.join(','), // Header row
    ...data.map((row: T) => {
      return columns
        .map((col) => {
          const value = (row as any)[col] ?? ''
          return `"${value.toString().replace(/"/g, '""')}"` // Escape quotes
        })
        .join(',')
    }),
  ].join('\n')

  try {
    await writeFile('' + name + '.csv', csvContent, 'utf8')
    return {
      success: true,
      filename: `${name}.csv`,
    }
  } catch (error) {
    console.error('Error writing CSV file:', error)
    return {
      success: false,
      filename: undefined,
    }
  }
}
