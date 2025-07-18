import { Data } from "../model/interfaceData.js";
import { estoqueService } from "../service/serviceEstoque.js";

const service = new estoqueService

export const adicionarProduto = async (data: Data) => {
    try{
        await service.criar(data)
        console.log("Produto adicionado com sucesso.")
    }
    catch(error){
        console.error("Erro ao adicionar o produto: ", error)
    }
}

export const listarProdutos = async () => {
    try {
        const produtos = service.listar()
        return produtos
    }
    catch(error){
        console.error("Erro ao listar os produtos", error)
    }
}

export const removerProduto = async (nome: string) => {
    try {
        await service.remover(nome)
        console.log("Produto removido com sucesso!")
    }
    catch(error){
        console.error("Erro ao remover o produto!", error)
    }
}