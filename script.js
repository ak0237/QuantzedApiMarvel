/*const scriptTag = document.createElement('script')
scriptTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js'
document.head.appendChild(scriptTag)*/

function fetchApiMarvel() {
    
    
    
    const ts = '1640660504620'
    const apiKey = '83b88d0adfd986c16eabc702bf00a366'
    const hash = 'e64b1dfab1dd4630fb069d80f1f85755'

    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
    .then((response) => {

        return response.json()})
    .then((objeto) => {
        console.log(objeto)

        //Código para definir quantos heróis estarão ativos 
        var seed = Math.floor(Math.random() * 9) + 1 
        var ativos = []

        //Loop para aleatorizar os heróis ativos
        for(let indice = 0; indice < seed; indice++){
             ativos [indice] = randomizer(objeto)
        }
        
        console.log(ativos)


        //Encontra onde os heróis aparecerão na página HTML
        const herois = document.querySelector('#herois_ativos')
        
        //Renderiza os heróis no HTML
        ativos.forEach((item) => {
        
            const nomeHeroi = item.name
            const srcImagem = item.thumbnail.path + '.' + item.thumbnail.extension

            criarDiv(srcImagem, nomeHeroi, herois)
            
        })
    })
}

function randomizer(objeto){
    const keys = Object.keys(objeto.data.results)
    const randIndex = Math.floor(Math.random() * keys.length)
    const randKey = keys[randIndex]
    const randomValue = objeto.data.results[randKey]
    //console.log(randomValue)
    return randomValue
}

function criarDiv(srcImagem, nomeHeroi, divHeroi){
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const nome = document.createElement('text')
    const img = document.createElement('img')

    nome.textContent = nomeHeroi
    img.src = srcImagem

    divFilho.appendChild(img)
    divFilho.appendChild(nome)
    divPai.appendChild(divFilho)
    divHeroi.appendChild(divPai)

    divPai.classList.add("personagem")
}