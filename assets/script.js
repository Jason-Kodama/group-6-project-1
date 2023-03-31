fetch('https://eldenring.fanapis.com/api/bosses')
.then(response => response.json())
.then(boss => {
  console.log(boss.results);
});

// an object to be stored later
let winnersLosers = {
    winners: [],
    losers: []
}
// check if localstorage has been updated yet
if(localStorage.getItem('winnersLosers')){
    // parse the stored object
    var parsedWinnersLosers = JSON.parse(localStorage.getItem('winnersLosers'));
    // loop through the stored object and update our object with its contents
    for(let winner of parsedWinnersLosers['winners']){
        winnersLosers['winners'].push(winner);
    }
    for(let loser of parsedWinnersLosers['losers']){
        winnersLosers['losers'].push(loser);
    }
// if localstorage hasn't been updated yet, update it with the empty object
}else{
    localStorage.setItem('winnersLosers', JSON.stringify(winnersLosers))
}
const cardsContainer = document.querySelector('cards-container');


function renderBoss(boss) {
  boss.forEach(boss => {
    const name  = document.createElement('h3'); 
    const image = document.createElement('img');
    const description = document.createElement('p');
    const div = document.createElement('div');     
    const like = document.createElement('button');

    div.classList = 'card'
    image.classList = 'card-img'
    like.classList = 'empty'
    image.src = boss.image
    name.innerText = `Name: ${boss.name}`
    description.innerText =`Description: ${boss.description}`
    like.textContent = 'like'
    div.appendChild(image)
    div.appendChild(name)
    div.appendChild(description)
    div.appendChild(like)
    cardsContainer.appendChild(div)
  })};

// when a winner button is pressed
$('.winner-button').click(function (e) { 
    e.preventDefault();
    // push the winning card's id into the winner array in the winnersLosers object
    winnersLosers['winners'].push($(e.target).parent().data('id'));
    // push the corresponding losing card's id into the loser array in the winnersLosers object
    winnersLosers['losers'].push($(e.target).parent().attr('id') == 'bossCard' ? $('#bossCard2').data('id') : $('#bossCard').data('id'));
    // store the updated object into local storage
    localStorage.setItem('winnersLosers', JSON.stringify(winnersLosers));
});