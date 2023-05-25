let lifes = 3;
var mousePos = {x: ($(window).width() / 2), y: ($(window).height() / 2)};
let mySoundLost;
let mySoundPoint;



$(document).ready(function(){
    goDown(true, 350);

    mySoundLost = document.getElementById('lost');
    mySoundPoint = document.getElementById('point');

    mySoundLost.load()
    mySoundPoint.load()

    $(document).keypress(function (event) {
        event.preventDefault();
        console.log(`you pressed ${event.which}`);
        let width = $(window).width();
        let left = $('.odpinkavatko').offset().left;

        if (event.which === 100) { //left
            console.log('you pressed left');
            let newLeft = width - 120;
            if (left < width - 150) newLeft = $('.odpinkavatko').offset().left + 50;
            $('.odpinkavatko').animate({ left: `${newLeft}px` }, 100)
        }
        else if (event.which === 97){ //right
            console.log('you pressed right');
            let newRight = 10;
            if (left >= 50) newRight = $('.odpinkavatko').offset().left - 50;
            $('.odpinkavatko').animate({ left: `${newRight}px` }, 100)
        }
       // alert(`You pressed a key ${num}`);
    });

    /*
    $(document).on("mousemove", function(ev) {
        mousePos.x = ev.pageX;
        mousePos.y = ev.pageY;
        $('.odpinkavatko').stop(true, false);
        $('.odpinkavatko').animate({ left: `${mousePos.x - 50}px` }, 100)

     });
     */

     $(".odpinkavatko").draggable({
        axis: 'x'
      });

})


function gameOver() {
    let over = $(`<center><div class="over"> GAME OVER </div></center>`);
    $('.odpinkavatko').remove();
    $('.ball').remove();
    $('body').append(over);

}


function goUp(left) {
    let easing = 'easeInOutQuad';
    let randomValue = Math.floor(Math.random() * 2);

    if(randomValue) goSide();

    $('.ball').animate({                   // Animujeme pohyb o 200px doprava
        "top" : `0px`,
        "left" : `${left}px`

    }, {
        duration : 2000                // Trvanie: 1 sekunda
    }, easing).promise().done(function() {
        let newLeft = Math.random() * 800;
        goDown(false, newLeft);
      });


}

function goDown(first, left) {
    let easing = 'easeInOutQuad';
    let randomValue = Math.floor(Math.random() * 2);


    $('.ball').animate({                   // Animujeme pohyb o 200px doprava
        "top" : `778px`,
        "left" : `${left}px`
    }, {
        duration :  2000                // Trvanie: 1 sekunda
    }, easing).promise().done(function() {
        let ball = $(this).offset();  
        let disc = $('.odpinkavatko').offset();

        if (disc.left <= ball.left + 10 && ball.left + 10 <= disc.left + 100){
            let newLeft = Math.random() * 800;
            mySoundPoint.play();
            goUp(newLeft);
            const score = document.querySelector('.sun');
            currentScore = parseInt(score.innerText, 10);
            score.innerText = currentScore + 1;
            return;
        }

        let newLeft = Math.random() * 800;
        goUp(newLeft);
        $(`#heart${lifes}`).remove();
        lifes--;
        if (lifes <= 0) {
            gameOver();
        }
    

      });
}

function goSide() {
    let easing = 'easeInOutQuad';
    let newTop = Math.random() * 400 + 100;
    let width = $(window).width() - 30;
    let randomValue = Math.floor(Math.random() * 2) * width;

    $('.ball').animate({                   // Animujeme pohyb o 200px doprava
        "top" : `${newTop}px`,
        "left" : `${randomValue}px`

    }, {
        duration : 2000                // Trvanie: 1 sekunda
    }, easing);


}