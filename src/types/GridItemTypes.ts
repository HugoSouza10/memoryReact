
//Tipagem para 1 item só, aqui estamos obrigando a ter esses itens
export type GridItemTypes = {
    item:number | null, //Verifica se temos a referência de um item do array ou não
    shown:boolean, //Verifica se o avatar está sendo exibido de forma temporária
    permamenteShown: boolean, //Verifica se está mostrando o avatar de forma permanente
}