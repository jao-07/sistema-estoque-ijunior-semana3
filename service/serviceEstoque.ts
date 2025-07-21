import { readCSV } from "../model/readCSV.js";
import { writeCSV } from "../model/writeCSV.js";
import { Data } from "../model/interfaceData.js";
import promptSync from 'prompt-sync'

const filePath = 'db/estoque.csv'

export class estoqueService{
    prompt: any

    constructor(){
        this.prompt = promptSync()
    }

    selecionarDadosDoProduto = () => {
        let produto: Data = {nome: "", valor: -1, quantidade: -1, peso: -1}
        while(produto.nome === ""){
            let nome = this.prompt('Digite o nome do produto: ')
            if(nome?.length == 0){
                console.log("Nome inválido!")
                continue
            }
            produto.nome = nome
        }

        while(produto.valor === -1){
            let valor = parseFloat(this.prompt('Digite o valor do item: '))
            if(valor < 0 || isNaN(valor)){
                console.log("Valor inválido!")
                continue
            }
            produto.valor = valor
        }

        while(produto.peso === -1){
            let peso = parseFloat(this.prompt('Digite o peso do item: '))
            if(peso < 0 || isNaN(peso)){
                console.log("Peso inválido!")
                continue
            }
            produto.peso = peso
        }

        while(produto.quantidade === -1 ){
            let quantidade = parseInt(this.prompt('Digite a quantidade do item: '),10)
            if(quantidade < 0 || isNaN(quantidade)){
                console.log("Quantidade inválida!")
                continue
            }
            produto.quantidade = quantidade
        }

        return produto
    }

    async criar(){
        const data = this.selecionarDadosDoProduto()

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