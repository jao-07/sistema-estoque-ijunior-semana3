import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'
import {Data} from './interfaceData.js'

export const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'nome', title: 'TÍTULO' },
      { id: 'valor', title: 'VALOR' },
      { id: 'peso', title: 'PESO' },
      { id: 'quantidade', title: 'QUANTIDADE' },
    ],
  })

  return csvWriter.writeRecords(data)
}
