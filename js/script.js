//Função Para Imprimir as Informações do Persobagem
function apareceBotao(){
    btn = document.getElementById("botao_imprimir")
    btn.setAttribute("style", "visibility: visible")
}
//Função Para Acessar a API
function fetchApiMarvel() {
    
    
    //Declarando as Constantes que Irão na UTL
    const ts = '1640660504620'
    const apiKey = '83b88d0adfd986c16eabc702bf00a366'
    const hash = 'e64b1dfab1dd4630fb069d80f1f85755'
    var offset = Math.floor(Math.random() * 1300) + 20


    //Função Para Acessar a API
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=15&offset=${offset}`)
    .then((response) => {
        return response.json()})
    .then((objeto) => {

        console.log(objeto)

        //Código Para Definir Quantos Personagens Estarão Ativos 
        var seed = Math.floor(Math.random() * 18) + 2 
        console.log(seed)
        var ativos = []

        //Loop Para Aleatorizar os Personagens Ativos
        for(let indice = 0; indice < seed; indice++){
            ativos [indice] = randomizer(objeto)
    
           //ordena os nomes alfabeticamente            
            ativos.sort((a, b) =>{
                if(a.name < b.name){
                    return false
                }else{
                    return true
                }
            })}

        //Função Para Excluir Personagens Repetidos     
        let heroisUnicos = [...new Map(ativos.map((item) => [item["name"], item])).values()]


        console.log(ativos)
        console.log(heroisUnicos)
       

        //Encontra Onde os Personagens Aparecerão na Página HTML
        const herois = document.querySelector('#herois_ativos')
        
        //Renderiza os Personagens no HTML
        heroisUnicos.forEach((item) => {
        
            //Sava o Nome, Descrição e Imagem de Cada Personagem
            const nomeHeroi = item.name
            const descricao = item.description
            const srcImagem = item.thumbnail.path + '.' + item.thumbnail.extension

            //Verifica se o Personagem possui Imagem
            if (srcImagem.includes('image_not_available.jpg') || srcImagem.includes('.gif')){
                return false
            }else{
                criarDiv(srcImagem, nomeHeroi, herois, descricao)
            }
        })
    })
}


//Função Para Aleatorizar os Personagens 
function randomizer(objeto){

    //Código Para Extrair as Keys de Cada Objeto
    const keys = Object.keys(objeto.data.results)

    //Código Para Gerar um Valor Aleatório de no Máximo a Quantidade de Keys Obtidas 
    const randIndex = Math.floor(Math.random() * keys.length)
    const randKey = keys[randIndex]

    //Código Para Encontrar o Personagem com a Key Aleatória 
    const randomValue = objeto.data.results[randKey]
    return randomValue

}


//Função Para Renderizar os Personagens 
function criarDiv(srcImagem, nomeHeroi, divHeroi, descricao){
    //Código Para Criar a Div de Cada Personagem 
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const divDesc = document.createElement('div')
    const nome = document.createElement('text')
    const img = document.createElement('img')
    const desc = document.createElement('p')

    //Código Para Preencher os Filhos da Div
    nome.textContent = nomeHeroi
    desc.textContent = descricao
    img.src = srcImagem

    //Código Para Inserir os Filhos Preenchidos na Div
    divFilho.appendChild(img)
    divFilho.appendChild(nome)
    divFilho.appendChild(desc)
    divPai.appendChild(divFilho)
    divHeroi.appendChild(divPai)

    //Código Para Adicionar Atriburos na Div
    divPai.classList.add("personagem")
    divFilho.setAttribute("onclick", "selecao(this.id); apareceBotao()")
    divFilho.setAttribute("id", nomeHeroi)
}


//Função Para Limpar os Personagegens que Estão na Tela
function limpar(){

    const div = document.getElementById("herois_ativos")
    div.innerText = ""

}


//Função Para Renderizar o Peronagem Escolhido no Terminal 
function selecao(escolhido){

    //Código Para Encontrar a Tela do Terminal, e Verificar Qual Personagem foi Selecionado 
    const selecionado = document.getElementById(escolhido)
    const tela = document.querySelector("#conteudo-tela")
    
    //Código Para Renderizar a Imagem e o Nome do Personagem Escolhido
    tela.firstElementChild.setAttribute('src', selecionado.firstChild.src)
    document.getElementById('nome-do-heoi').innerHTML = `Name: ${escolhido} <hr>`

    //Código Para Verificar se o Personagem Possui Descrição
    if(selecionado.lastChild.textContent == ""){
        tela.lastElementChild.lastElementChild.innerHTML = "<strong>Acess Denied</strong><br>Additional informatons about this element are denied to recruits.<br>"
    }else{
        tela.lastElementChild.lastElementChild.innerHTML = `Description: ${selecionado.lastChild.textContent}`
    }

}