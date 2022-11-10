const modalDiv = document.getElementById('modal-div')
const formEl = document.querySelector('#form-el')
const playerNameEl = document.getElementById('player-name-el')
const balanceEl = document.getElementById('balance-el')
const modalInner = document.getElementById(`modal-inner`)
const startGameBtn = document.getElementById(`start-game-btn`)
const newCardBtn = document.getElementById('new-card-btn')
const cardsEl = document.getElementById('cards-el')
const sumEl = document.getElementById('sum-el')
const messageEl = document.querySelector(`#message-el`)

let sum = 0
let cardsPicked = []
let cardsArray = [1,2,3,4,5,6,7,8,9,10]
let balance = 0
let playerName = ``

setTimeout(displayModal,4000)
formEl.addEventListener('submit',formSubmission)
startGameBtn.addEventListener('click',startGame)
newCardBtn.addEventListener('click',pickNewCard)

function displayModal(){
    modalDiv.style.display = `block`
}
 function formSubmission(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    playerName = formData.get(`user-name`)
    balance = formData.get(`recharge`)
    playerName = playerName[0].toUpperCase() + playerName.slice(1).toLowerCase()
    playerNameEl.textContent += playerName
    balanceEl.innerText = `$${balance}`
    setTimeout(()=>{
        modalInner.innerHTML = `
        <p class='welcome'>Welcome aboard ${playerName}</p>
        <p class='welcome'>Your current balance is $${balance}</p>`
        modalDiv.style.color = `white`
        modalDiv.style.backgroundColor = `orange`
    },3000)

    setTimeout(()=>{
        startGameBtn.disabled = false
        modalDiv.style.display = `none`
    },6000)
 }

 function startGame(){
    let randomnum1 = getRandomNumber()
    let randomnum2 = getRandomNumber()
    let cardOne = cardsArray[randomnum1]
   /* cardsArray = cardsArray.filter(card=>{
        return card !== cardOne
    })*/
    let cardTwo = cardsArray[randomnum2]
    cardsPicked.push(cardOne,cardTwo)
    cardsEl.innerText = cardsPicked
    sum = cardOne + cardTwo
    sumEl.innerText = sum
    newCardBtn.disabled = false
    startGameBtn.disabled = true
    
 }

function pickNewCard(){
    let randomNum = getRandomNumber()
    let card = cardsArray[randomNum]
    cardsPicked.push(card)
    cardsEl.innerText = cardsPicked
    sum += card
    sumEl.innerText = sum
    gameState()
}

function gameState(){
    if(sum === 21) {
        newCardBtn.disabled = true
        balance *= 1.5
        balance = Number.parseFloat(balance.toFixed(2))
        balanceEl.textContent = `$${balance}`
        messageEl.textContent = `Congrats ${playerName}, You beat the house!`
        messageEl.style.cssText = `color:blue; fontWeight:bold;`
        setTimeout(resetGame,6000)
    }else if(sum > 21){
        newCardBtn.disabled = true
        balance *= 0.8
        balance = Number.parseFloat(balance.toFixed(2))
        balanceEl.textContent = `$${balance}`
        messageEl.textContent = `Sorry ${playerName}, The house owns you!`
        messageEl.style.cssText = `color:orange; fontWeight:bold;`
        setTimeout(resetGame,6000)
    }
}

function resetGame(){
    messageEl.textContent = `Want to play a round?`
    messageEl.style.cssText = `color:white; fontWeight:bold;`
    cardsEl.innerText = ``
    cardsPicked = []
    sumEl.innerText = ``
    sum = 0
    startGameBtn.disabled = false
}

 function getRandomNumber(){
    return Math.floor(Math.random()*cardsArray.length)
 }