import { createRequire } from 'module';
import { Data } from './model/interfaceData.js';
import { adicionarProduto } from './controller/controleEstoque.js';

const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')({sigint: true});
let rodando = true

const adicionar = () => {
    let produto: Data = {nome: "", valor: -1, quantidade: -1, peso: -1}
    while(produto.nome === ""){
        let nome = prompt('Digite o nome do produto: ')
        if(nome.length < 0){
            console.log("Nome inválido!")
            continue
        }
        produto.nome = nome
    }

    while(produto.valor === -1){
        let valor = prompt('Digite o valor do item: ')
        if(valor.length < 0){
            console.log("Valor inválido!")
            continue
        }
        produto.valor = valor
    }

    while(produto.peso === -1){
        let peso = prompt('Digite o peso do item: ')
        if(peso.length < 0){
            console.log("Peso inválido!")
            continue
        }
        produto.peso = peso
    }

    while(produto.quantidade === -1){
        let quantidade = prompt('Digite a quantidade do item: ')
        if(quantidade.length < 0){
            console.log("Quantidade inválida!")
            continue
        }
        produto.quantidade = quantidade
    }

    return produto
}

while(rodando){

    console.log("Bem vindo ao sistema de estoque \nUtilize os números para selecionar alguma das opções abaixo:")
    console.log(" 1 - Adicionar item \n 2 - Remover item \n 3 - Listar itens \n 4 - Mostrar valor total do estoque \n 5 - Mostrar peso total do estoque \n 6- Calcular média de valor dos produtos \n 7 - Calcular média de peso dos itens \n 8- Mostrar quantidade total de itens \n 9 - Mostrar quantidade total de produtos \n 0 - Sair\n\n")

    let escolha = parseInt(prompt('Selecione uma opção: '), 10)
    console.log("Escolha: ", escolha)

    if(escolha == 0){
        rodando = false
    }

    if(escolha == 1){
        let produto = adicionar()
        adicionarProduto(produto)
    }
}

