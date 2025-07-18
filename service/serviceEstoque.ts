import { readCSV } from "../model/readCSV.js";
import { writeCSV } from "../model/writeCSV.js";
import { Data } from "../model/interfaceData.js";
import fs from 'fs'

const filePath = './db/estoque.csv'

export class estoqueService{
    async criar(data: Data){
        if(typeof data.nome !== 'string' || data.nome.length == 0)
            throw new Error('Campo nome inválido!')

        if(isNaN(data.peso) || data.peso < 0)
            throw new Error('Campo peso inválido!')

        if(isNaN(data.valor) || data.valor < 0)
            throw new Error('Campo valor inválido!')

        if(isNaN(data.quantidade) || data.quantidade < 0)
            throw new Error('Campo quantidade inválido!')

        await writeCSV(filePath, [data])
    }
}