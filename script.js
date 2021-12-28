/*const scriptTag = document.createElement('script')
scriptTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js'
document.head.appendChild(scriptTag)*/

function fetchApiMarvel() {
    
    
    
    const ts = '1640660504620'
    const apiKey = '83b88d0adfd986c16eabc702bf00a366'
    const hash = 'e64b1dfab1dd4630fb069d80f1f85755'
    var offset = Math.floor(Math.random() * 1300) + 20

    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=20&offset=${offset}`)
    .then((response) => {

        return response.json()})
    .then((objeto) => {
        console.log(objeto)

        //Código para definir quantos heróis estarão ativos 
        var seed = Math.floor(Math.random() * 18) + 2 
        console.log(seed)
        var ativos = []

        //Loop para aleatorizar os heróis ativos
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

        let heroisUnicos = [...new Map(ativos.map((item) => [item["name"], item])).values()]

        console.log(ativos)
        console.log(heroisUnicos)

       


        //Encontra onde os heróis aparecerão na página HTML
        const herois = document.querySelector('#herois_ativos')
        
        //Renderiza os heróis no HTML
        heroisUnicos.forEach((item) => {
        
            const nomeHeroi = item.name
            const srcImagem = item.thumbnail.path + '.' + item.thumbnail.extension
            if (srcImagem.includes('image_not_available.jpg')){
                return false
            }else{
                criarDiv(srcImagem, nomeHeroi, herois)
            }
        })
    })
}



function randomizer(objeto){
    const keys = Object.keys(objeto.data.results)
    const randIndex = Math.floor(Math.random() * keys.length)
    const randKey = keys[randIndex]
    const randomValue = objeto.data.results[randKey]
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