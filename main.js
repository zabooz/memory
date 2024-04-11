const gameField   =  document.querySelector('.gameField')
const cardCount = document.querySelector('p')
const start = document.querySelector('#start')
const fieldSlider = document.querySelector('input')
const endlessMode = document.querySelector('#endless')
const birdArr = []

let pairArr = []


for (let i = 0; i <= 15; i++) {
    
    const bird = new Bird(i)
    birdArr.push(bird);
}

function Bird (nr){
    this.num = nr
    this.src = `vogel${nr}.jpeg`
}

start.addEventListener('click', () => {
    pairArr = []
    gameField.innerHTML = ''
    const birdCopy = [...birdArr]
    const value = fieldSlider.value
    let nodeList = []
    
    const gridSize = generateGrid(value)

    gameField.style.gridTemplateRows = `repeat(${gridSize[0]},1fr)`
    gameField.style.gridTemplateColumns = `repeat(${gridSize[1]},1fr)`
    
    for(let i = 0; i < value/2;i++){
        createCardList(nodeList,birdCopy)
    }
    
    displayCards(nodeList)
    
})


fieldSlider.addEventListener('input', () => {
    cardCount.textContent = fieldSlider.value
})


function displayCards (nodeList){
    shuffle(nodeList)
    nodeList.forEach(card => gameField.append(card))
}





function createCardList(nodeList,birdCopy){

    const rdm = Math.floor(Math.random()*birdCopy.length)
    
    for(let i = 0 ; i < 2 ; i++){
        const card = document.createElement('div')
        const num = birdCopy[rdm].num

        card.classList.add('card')
        card.setAttribute('nr', num)

        nodeList.push(card)

        card.addEventListener('click', function(){
            turnCard(card,pairArr)
        })

    }

    birdCopy.splice(rdm,1)
    
}

function generateGrid(num){

    let factors = [];

    for(let i = 1; i <= Math.sqrt(num);i++){

        if(num %1 === 0){

            factors.push([i,num/i])
        }
    }

    let minDiff = Number.MAX_SAFE_INTEGER
    let bestFactors = []

    factors.forEach(pair => {
        let difference = Math.abs(pair[0] - pair[1])

        if(difference < minDiff){
            minDiff = difference
            bestFactors = pair
        }
    })



    bestFactors = [Math.ceil(bestFactors[0]),Math.ceil(bestFactors[1])]
    return bestFactors
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function turnCard (card){
    const num = card.getAttribute('nr')
    pairArr.push(card)
    
    card.style.backgroundImage = `url(./img/vogel${num}.jpeg)`
    
    if(pairArr.length === 2){
        checkPair(pairArr)
    }
    
}

function checkPair(){
    

        const numOne = pairArr[0].getAttribute('nr') 
        const numTwo = pairArr[1].getAttribute('nr') 
        let nodeOne  = pairArr[0]
        let nodeTwo  = pairArr[1]
        pairArr = []

        if(numOne === numTwo){
            
            gameField.childNodes.forEach(node => {
                
            const nodeNum = node.getAttribute('nr')
    
            if(nodeNum === numOne){
                nodeOne === undefined ? nodeOne = node : nodeTwo = node
            }

            if(nodeTwo !== undefined){   
                nodeOne.classList.add('animation')
                nodeTwo.classList.add('animation')
            }
         })
        }else{
            setTimeout(function(){
                nodeOne.style.backgroundImage = 'url(./img/cardBack.jpeg)'
                nodeTwo.style.backgroundImage = 'url(./img/cardBack.jpeg)'
            },1000)
  
        }
 
}




