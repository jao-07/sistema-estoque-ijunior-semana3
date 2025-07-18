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