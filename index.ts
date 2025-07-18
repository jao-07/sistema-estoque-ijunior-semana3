import promptSync from 'prompt-sync'
import { Data } from './model/interfaceData.js';
import { adicionarProduto, listarProdutos, removerProduto } from './controller/controleEstoque.js';

const prompt = promptSync()
let rodando = true

const adicionar = () => {
    let produto: Data = {nome: "", valor: -1, quantidade: -1, peso: -1}
    while(produto.nome === ""){
        let nome = prompt('Digite o nome do produto: ')
        if(nome.length == 0){
            console.log("Nome inválido!")
            continue
        }
        produto.nome = nome
    }

    while(produto.valor === -1){
        let valor = parseInt(prompt('Digite o valor do item: '),10)
        if(valor < 0 || isNaN(valor)){
            console.log("Valor inválido!")
            continue
        }
        produto.valor = valor
    }

    while(produto.peso === -1){
        let peso = parseInt(prompt('Digite o peso do item: '),10)
        if(peso < 0 || isNaN(peso)){
            console.log("Peso inválido!")
            continue
        }
        produto.peso = peso
    }

    while(produto.quantidade === -1 ){
        let quantidade = parseInt(prompt('Digite a quantidade do item: '),10)
        if(quantidade < 0 || isNaN(quantidade)){
            console.log("Quantidade inválida!")
            continue
        }
        produto.quantidade = quantidade
    }

    return produto
}

const main = async () => {
    while(rodando){
        console.log("\n\nBem vindo ao sistema de estoque \nUtilize os números para selecionar alguma das opções abaixo:")
        console.log(" 1 - Adicionar item \n 2 - Remover item \n 3 - Listar itens \n 4 - Mostrar valor total do estoque \n 5 - Mostrar peso total do estoque \n 6- Calcular média de valor dos produtos \n 7 - Calcular média de peso dos itens \n 8- Mostrar quantidade total de itens \n 9 - Mostrar quantidade total de produtos \n 0 - Sair\n\n")

        let escolha = parseInt(prompt('Selecione uma opção: '), 10)

        if(escolha == 0){
            rodando = false
        }

        if(escolha == 1){
            let produto = adicionar()
            await adicionarProduto(produto)
        }

        if(escolha == 2){
            let produtoAlvo = prompt('Digite o nome do produto a ser removido: ')
            await removerProduto(produtoAlvo)
        }

        if(escolha == 3){
            let lista = await listarProdutos()
            if(lista?.length == 0)
                console.log("Lista vazia")
            lista?.forEach(element => {
                console.log(`Nome: ${element.nome} | Valor: ${element.valor} | Peso: ${element.peso} | Quantidade: ${element.quantidade}`)
            });
        }
    }
}

main()

