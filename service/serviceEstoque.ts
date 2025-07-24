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

    selecionarDadosDoProduto = async () => {
        let produto: Data = {nome: "", valor: -1, quantidade: -1, peso: -1}
        let estoque = await readCSV(filePath)
        while(produto.nome === ""){
            let nome = this.prompt('Digite o nome do produto: ')
            if(nome?.length == 0){
                console.log("Nome inválido!")
                continue
            }

            if(estoque.findIndex(item => item.nome === nome) !== -1){
                console.log("Esse produto já existe no estoque! Não é possível adicionar dois produtos com o mesmo nome.")
                continue
            }

            produto.nome = nome
        }

        while(produto.valor === -1){
            let valor = parseFloat(this.prompt('Digite o valor do item (Em R$): '))
            if(valor < 0 || isNaN(valor)){
                console.log("Valor inválido!")
                continue
            }
            produto.valor = valor
        }

        while(produto.peso === -1){
            let peso = parseFloat(this.prompt('Digite o peso do item (Em kg): '))
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
        const data = await this.selecionarDadosDoProduto()

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
        const estoque = await readCSV(filePath)
        if(estoque?.length == 0)
            console.log("Lista vazia")
        estoque?.forEach(element => {
            let valor = Number(element.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            let peso = Number(element.peso).toLocaleString('pt-br',{style: 'unit', unit: 'kilogram'})
            console.log(`Nome: ${element.nome} | Valor: ${valor} | Peso: ${peso} | Quantidade: ${element.quantidade}`)
        });
    }

    async remover (nome:string){
        let estoque = await readCSV(filePath)
        if(!estoque.find((e) => e.nome == nome))
            throw new Error('Produto não está no estoque')
        let estoqueFiltrado = estoque.filter((produto) => produto.nome != nome)
        await writeCSV(filePath, estoqueFiltrado)
    }

    async valorTotal(){
        let estoque = await readCSV(filePath)
        return estoque?.reduce((acc:number, e)=> acc + Number(e.valor) * Number(e.quantidade), 0)
    }

    async pesoTotal(){
        let estoque = await readCSV(filePath)
        return estoque?.reduce((acc:number, e)=> acc + Number(e.peso) * Number(e.quantidade), 0)
    }

    async quantidadeTotalItens(){
        let estoque = await readCSV(filePath)
        return estoque?.reduce((acc:number, e)=> acc + Number(e.quantidade), 0)
    }

    async mostrarValorTotal(){
        const valor = await this.valorTotal()
        console.log("Valor total do estoque: ", valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
    }

    async mostrarPesoTotal(){
        const peso = await this.pesoTotal()
        console.log("Peso total do estoque: ", peso.toLocaleString('pt-br',{style: 'unit', unit: 'kilogram'}))
    }

    async mostrarMediaValor(){
        const valor = await this.valorTotal()
        const quantidade = await this.quantidadeTotalItens()
        const media = valor / quantidade
        console.log("Valor médio do estoque: ", media.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
    }

    async mostrarMediaPeso(){
        const peso = await this.pesoTotal()
        const quantidade = await this.quantidadeTotalItens()
        const media = peso / quantidade
        console.log("Peso médio do estoque: ", media.toLocaleString('pt-br',{style: 'unit', unit: 'kilogram'}))
    }

    async mostrarQuantidadeTotalItens(){
        const valor = await this.quantidadeTotalItens()
        console.log("Quantidade total de itens do estoque: ", valor)
    }

    async mostrarQuantidadeTotalProdutos(){
        let estoque = await readCSV(filePath)
        const numeroProdutos = estoque?.reduce((acc:number)=> acc + 1, 0)
        console.log("Quantidade total de produtos do estoque: ", numeroProdutos)
    }
}