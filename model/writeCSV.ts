import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'
import {Data} from './interfaceData.js'

export const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'nome', title: 'nome' },
      { id: 'valor', title: 'valor' },
      { id: 'peso', title: 'peso' },
      { id: 'quantidade', title: 'quantidade' },
    ],
  })

  return csvWriter.writeRecords(data)
}
