import { readCSV } from "../model/readCSV.js";
import { writeCSV } from "../model/writeCSV.js";
import { Data } from "../model/interfaceData.js";
import fs from 'fs'

const filePath = 'db/estoque.csv'

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

        let estoque = await readCSV(filePath)
        await writeCSV(filePath, [...estoque, data])
    }

    async listar(){
        return await readCSV(filePath)
    }

    async remover (nome:string){
        let estoque = await readCSV(filePath)
        if(!estoque.find((e) => e.nome == nome))
            throw new Error('Produto não está no estoque')
        let estoqueFiltrado = estoque.filter((produto) => produto.nome != nome)
        await writeCSV(filePath, estoqueFiltrado)
    }
}