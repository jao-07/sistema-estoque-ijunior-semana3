import { Data } from "../model/interfaceData.js"
import { estoqueService } from "../service/serviceEstoque.js"
import promptSync from 'prompt-sync'

export default class estoqueController{
    service: estoqueService
    rodando: boolean
    prompt: any

    constructor(){
        this.service = new estoqueService
        this.rodando = true
        this.prompt = promptSync()
    }

    adicionarProduto = async () => {
        try{
            await this.service.criar()
            console.log("Produto adicionado com sucesso.")
        }
        catch(error){
            console.error("Erro ao adicionar o produto: ", error)
        }
    }

    listarProdutos = async () => {
        try {
            return await this.service.listar()
        }
        catch(error){
            console.error("Erro ao listar os produtos", error)
        }
    }

    removerProduto = async () => {
        try {
            let produtoAlvo = this.prompt('Digite o nome do produto a ser removido: ')
            await this.service.remover(produtoAlvo)
            console.log("Produto removido com sucesso!")
        }
        catch(error){
            console.error("Erro ao remover o produto!", error)
        }
    }

    mostrarValorTotalDoEstoque = async () => {
        try{
            await this.service.mostrarValorTotal()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    mostrarPesoTotalDoEstoque = async () => {
        try{
            await this.service.mostrarPesoTotal()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    mostrarMediaDeValorDoEstoque = async () => {
        try{
            await this.service.mostrarMediaValor()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    mostrarMediaDePesoDoEstoque = async () => {
        try{
            await this.service.mostrarMediaPeso()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    mostrarQuantidadeItens = async () => {
        try{
            await this.service.mostrarQuantidadeTotalItens()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    mostrarQuantidadeProdutos = async () => {
        try{
            await this.service.mostrarQuantidadeTotalProdutos()
        }
        catch(error){
            console.error("Erro ao mostrar o valor total!", error)
        }
    }

    main = async () => {
        while(this.rodando){
            console.log("\n\nBem vindo ao sistema de estoque \nUtilize os números para selecionar alguma das opções abaixo:")
            console.log(" 1 - Adicionar item \n 2 - Remover item \n 3 - Listar itens \n 4 - Mostrar valor total do estoque \n 5 - Mostrar peso total do estoque \n 6- Calcular média de valor dos produtos \n 7 - Calcular média de peso dos itens \n 8- Mostrar quantidade total de itens \n 9 - Mostrar quantidade total de produtos \n 0 - Sair\n\n")

            let escolha = parseInt(this.prompt('Selecione uma opção: '), 10)

            switch(escolha){
                case 0:
                    this.rodando = false
                    break

                case 1:
                    await this.adicionarProduto()
                    break

                case 2:
                    await this.removerProduto()
                    break

                case 3:
                    await this.listarProdutos()
                    break

                case 4:
                    await this.mostrarValorTotalDoEstoque()
                    break

                case 5:
                    await this.mostrarPesoTotalDoEstoque()
                    break

                case 6:
                    await this.mostrarMediaDeValorDoEstoque()
                    break

                case 7:
                    await this.mostrarMediaDePesoDoEstoque()
                    break

                case 8:
                    await this.mostrarQuantidadeItens()
                    break

                case 9:
                    await this.mostrarQuantidadeProdutos()
                    break

                default:
                    console.log("Opção inválida!")
                    
            }
        }
    }
}