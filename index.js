let pairNumber = 12;
const players = [
  {
    name: 'Player1',
    points: 0
  },
  {
    name: 'Player2',
    points: 0
  }
]

let actualPlayer = 1;
let canFlip = true;
let firstFlip = true;
let firstCard;
let secondCard;
let firstCardData = null;
let secondCardData = null;
let startGame = false;
const cardPictures = [
  {
    img: 'https://jobbmintatv.hu/borito/sorozat/Hodito_hodok_big.jpg',
    framework: 'beaver'
  },
  {
    img: 'https://24.p3k.hu/app/uploads/2017/10/arnold-800x450.png',
    framework: 'arnold'
  },
  {
    img: 'https://static.sorozatbarat.online/covers/2253/5.jpg',
    framework: 'monsters'
  },
  {
    img: 'https://www.filmtekercs.hu/wp-content/uploads/2019/04/rugrats.jpg',
    framework: 'rugrats'
  },
  {
    img: 'https://m.blog.hu/we/wesko/image/the-cramp-twins-new-pictures-8_1.jpg',
    framework: 'twins'
  },
  {
    img: 'https://d2snwnmzyr8jue.cloudfront.net/tur_rads1004121900081382_270.jpeg',
    framework: 'ednedd'
  },
  {
    img: 'https://i.pinimg.com/originals/83/93/7b/83937bc6e7a4bf60617b5016c64d6d89.png',
    framework: 'catdog'
  },
  {
    img: 'https://www.indiewire.com/wp-content/uploads/2019/08/Rocko_Poster_Dated.jpg',
    framework: 'rocko'
  },
  {
    img: 'https://snitt.hu/system/covers/big/covers_59954.jpg?1546014785',
    framework: 'temple'
  },
  {
    img: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/9c74a9c62b254955d3d532ab0ed1e1ee77f5ce178e5893ec47c2ef8aa8b00c81._RI_V_TTW_.jpg',
    framework: 'grim'
  },
  {
    img: 'https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg',
    framework: 'spongebob'
  },
  {
    img: 'https://www.viacomcbsanz.com/wp-content/uploads/2020/08/Dora-The-Explorer-20th-Anniversary-2-SQ.jpg',
    framework: 'dora'
  }
];

const shuffleBoard = () => {
  let array = [];
  const cards = document.querySelectorAll('.memory-card');
  for (let i = 1; i < pairNumber * 2 + 1; i++) {
    array.push(i);
  }
  array.sort(() => Math.random() - 0.5);
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.order = array[i];
  }
}

const createElementAndAddAttributes = (type, attrs) => {
  const el = document.createElement(type);
  Object.keys(attrs).map((index, key) => {
    if (index !== 'text') {
      el.setAttribute(index, attrs[index]);
    } else {
      el.textContent = attrs[index];
    }
  });
  return el;
}

const createCard = (i) => {
  let memoryCard = createElementAndAddAttributes('DIV', {
    "class": "memory-card",
    "data-framework": cardPictures[i].framework
  });
  let frontFace = createElementAndAddAttributes('IMG', {
    "class": "front-face",
    "src": cardPictures[i].img,
  });
  let backFace = createElementAndAddAttributes('IMG', {
    "class": "back-face",
    "src": "https://i.pinimg.com/originals/41/e2/33/41e233b9fc1d226d1ff6a59a85206a22.png",
    "alt": "logo"
  });
  memoryCard.appendChild(frontFace);
  memoryCard.appendChild(backFace);
  return memoryCard;
}

const showActivePlayer = () => {
  let AllPlayerDiv = document.querySelectorAll('.player');
  for (let i = 0; i < AllPlayerDiv.length; i++) {
    if (i === actualPlayer) {
      AllPlayerDiv[i].classList.add('active');
    } else {
      AllPlayerDiv[i].classList.remove('active');
    }
  }
}

createAndEditPlayers = () => {
  if (startGame) {
    let playersDiv = document.querySelector('.players');
    playersDiv.innerHTML = '';
    players.forEach(player => {
      let playerDiv = createElementAndAddAttributes('DIV', {
        'class': 'player',
        'text': `${player.name}: ${player.points}`
      });
      playersDiv.appendChild(playerDiv);
    });
  } else {
    let AllPlayersDiv = document.querySelectorAll('.player');
    for (let i = 0; i < AllPlayersDiv.length; i++) {
      AllPlayersDiv[i].innerHTML = `${players[i].name}: ${players[i].points}`;
    }
  }
}

const createBoard = () => {
  const memoryGame = document.querySelector('.memory-game');
  for (let i = 0; i < pairNumber; i++) {
    memoryGame.appendChild(createCard(i));
    memoryGame.appendChild(createCard(i));
  }
  createAndEditPlayers();
  showActivePlayer();
  createdDone = true;
}

const nextPlayer = () => {
  const nextPlayerIndex = actualPlayer + 1 > players.length - 1 ? 0 : actualPlayer + 1;
  actualPlayer = nextPlayerIndex;
  showActivePlayer();
}

const addPoint = () => {
  players[actualPlayer].points += 1;
}

const newGame = () => {
  startGame = true;
  players.forEach(player => {
    player.points = 0;
  })
  const playersDiv = document.querySelector('.players');
  const memoryGameDiv = document.querySelector('.memory-game');
  document.removeEventListener('click', newGame);
  playersDiv.innerHTML = '';
  memoryGameDiv.innerHTML = '';
  createBoard();
  createEventListeneres();
  shuffleBoard();
}

function checkEnd() {
  let allPoints = 0;
  players.forEach(player => {
    allPoints += player.points;
  });
  if (allPoints === pairNumber) {
    setTimeout(() => {
      document.addEventListener('click', newGame);
    }, 1500);
  }
}

function flipCard() {
  if (canFlip) {
    if (!this.classList.contains('flip')) {
      canFlip = false;
      this.classList.toggle('flip');
      if (firstFlip) {
        firstFlip = false;
        firstCardData = this.dataset.framework;
        firstCard = this;
        canFlip = true;
      } else {
        firstFlip = true;
        secondCardData = this.dataset.framework;
        secondCard = this;
        if (firstCardData !== null &&
          secondCard !== null &&
          firstCardData === secondCardData) {
          addPoint();
          firstCard.removeEventListener('click', flipCard);
          secondCard.removeEventListener('click', flipCard);
          canFlip = true;
          createAndEditPlayers();
          showActivePlayer();
          checkEnd();
        } else {
          nextPlayer();
          setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            canFlip = true;
          }, 2000);
        }
      }
    }
  }
}
const createEventListeneres = () => {
  const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
}

newGame();