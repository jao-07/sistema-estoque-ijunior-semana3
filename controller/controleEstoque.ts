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
            const produtos = this.service.listar()
            return produtos
        }
        catch(error){
            console.error("Erro ao listar os produtos", error)
        }
    }

    removerProduto = async (nome: string) => {
        try {
            await this.service.remover(nome)
            console.log("Produto removido com sucesso!")
        }
        catch(error){
            console.error("Erro ao remover o produto!", error)
        }
    }

    main = async () => {
        while(this.rodando){
            console.log("\n\nBem vindo ao sistema de estoque \nUtilize os números para selecionar alguma das opções abaixo:")
            console.log(" 1 - Adicionar item \n 2 - Remover item \n 3 - Listar itens \n 4 - Mostrar valor total do estoque \n 5 - Mostrar peso total do estoque \n 6- Calcular média de valor dos produtos \n 7 - Calcular média de peso dos itens \n 8- Mostrar quantidade total de itens \n 9 - Mostrar quantidade total de produtos \n 0 - Sair\n\n")

            let escolha = parseInt(this.prompt('Selecione uma opção: '), 10)

            if(escolha == 0){
                this.rodando = false
            }

            if(escolha == 1){
                await this.adicionarProduto()
            }

            if(escolha == 2){
                let produtoAlvo = this.prompt('Digite o nome do produto a ser removido: ')
                await this.removerProduto(produtoAlvo)
            }

            if(escolha == 3){
                let lista = await this.listarProdutos()
                if(lista?.length == 0)
                    console.log("Lista vazia")
                lista?.forEach(element => {
                    console.log(`Nome: ${element.nome} | Valor: ${element.valor} | Peso: ${element.peso} | Quantidade: ${element.quantidade}`)
                });
            }
        }
    }
}