
// the different object in the program game
var Objets = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}


// function reset
function reset(){
    location.reload()
}
  



// this is presente the situation when we start
var state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

// This function shuffles the cards before starting
var shuffle = array => {
    var clonedArray = [...array]

    for (var index = clonedArray.length - 1; index > 0; index--) {
        var randomIndex = Math.floor(Math.random() * (index + 1))
        var original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}


// Randomly choose different cards before adding it to the table
var pickRandom = (array, items) => {
    var clonedArray = [...array]
    var randomPicks = []

    for (var index = 0; index < items; index++) {
        var randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

var generateGame = () => {
    var dimensions = Objets.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error  //The dimension of the board must be an even number (horizontal and vertical)
    }

 

    var emojis = ['⚽','🏀','🥊','🏓','🎾','🏈','🏐','🏒','⚾']    // I take the imojis to this link'https://emojipedia.org/twitter-emoji-stickers/'
    var picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    var items = shuffle([...picks, ...picks])
    var cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    var parser = new DOMParser().parseFromString(cards, 'text/html')    // creat interface analysis will analys a string text with HTML 
    Objets.board.replaceWith(parser.querySelector('.board'))
}

var startGame = () => {
    state.gameStarted = true
    Objets.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        Objets.moves.innerText = `${state.totalFlips} moves`
        Objets.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}


var flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {         //you will not matched the card after flip**
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

// Flip card and make acounte for a fliper and a total flip
var flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }
// to matched the cards when we flip 2 cards
    if (state.flippedCards === 2) {
        var flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

// display the result after to win
if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
        Objets.boardContainer.classList.add('flipped')
        Objets.win.innerHTML = `
            <span class="win-text">
                YOU WON<br />
                with <span class="highlight">${state.totalFlips}</span> moves<br />
                under <span class="highlight">${state.totalTime}</span> seconds
            </span>
        `

        clearInterval(state.loop)
    }, 1000)
}
}


var attachEventListeners = () => {
    document.addEventListener('click', event => {
        var eventTarget = event.target
        var eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } 
    })
}

generateGame()
attachEventListeners()


