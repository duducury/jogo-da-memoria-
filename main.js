const cardBoard = document.querySelector("#cardboard");
const images = [
  'foto1.jpeg',
  'foto2.jpeg',
  'foto3.jpeg',
  'foto4.jpeg',
  'foto5.jpeg',
  'foto6.jpeg',
  'foto7.jpg',
  'foto8.jpeg'
];

let cardHTML = '';

images.forEach(img => {
  cardHTML += `
<div class="memory-card" data-card="${img}">
<img class="front-face"   src="img/${img}">
<img class="back-face"    src="img/fundo.jpg">
</div>
`

});

cardBoard.innerHTML = cardHTML + cardHTML;

// fim

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  if(lockCard) return false;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    
    return false;
  }

  secondCard= this;

  checkForMatch();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.card == secondCard.dataset.card;

 !isMatch ? disableCards(): resetCard(isMatch);
}
function disableCards(){
  lockCard = true;

  setTimeout(()=> {
     firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');


     resetCard();
    }, 1000);
}

(function shuffle(){
cards.forEach(card =>{
  let rand = Math.floor(Math.random()*12);
  card.style.order = rand;
});
})();

function resetCard(isMatch= false){
if (isMatch){
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
}

  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));

