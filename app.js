// when document is ready
$(document).ready( function() {

// get card game
const $cardGame = $('.memory-game');
// get memory cards
const $cards = $('.memory-card');

// dodaj event handler kada netko klikne na kartu
$cards.on('click', cardClicked);

let counter = 0;
let lastCard, currentCard;
let guessed = 0;
const array = [];


function cardClicked(event) {
    // prikaži drugu stranu
    // prvi element u setu, front face i prikaži ga
    const $frontFace = $(this).find('.front-face');
    $($frontFace).hide();
    const $backFace = $(this).find('.back-face');
    $($backFace).show();
    counter++;
    lastCard = currentCard;
    currentCard = this;

    array.unshift($($backFace).attr('alt'));
    array.length = 2;
    // provjeri jesu li alt atributi za front face isti
    // ako nisi isti vrati ih u prijašnje stanje
    if(counter >= 2 && counter %2 === 0) {
        if(checkIfSame()) {
            console.log("pogodio si!");
            $(lastCard).unbind();
            $(currentCard).unbind();
            guessed++;
            if(guessed === 3) {
                alert("Congratulations!");
                setTimeout(flipBackAllCards, 1000);
                $cards.on('click', cardClicked);

            }

        } else {
            console.log("nisi pogodio");
                setTimeout(function() {
                let $nff = $(lastCard).find('.front-face');
                $($nff).show();
                let $nbf = $(lastCard).find('.back-face');
                $($nbf).hide();

                let $cff = $(currentCard).find('.front-face');
                $($cff).show();
                let $cbf = $(currentCard).find('.back-face');
                $($cbf).hide();
            }, 1000)
            
        }
    }

}

function checkIfSame() {
    if(array[0] == array[1])
        return true;
    return false;
}

function flipBackAllCards() {
    $cards.data('flipped', 'false');
    const $backFace = $($cards).find('.back-face');
    $($backFace).hide();
    const $frontFace = $($cards).find('.front-face');
    $($frontFace).show();
}

});

