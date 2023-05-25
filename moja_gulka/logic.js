let mySound = new Audio('punch.mp3');

$(document).ready(function() {
    localStorage.setItem("points", 0);
    var lifes = 3;
    // Set initial variables
    var gravity = 2; // m/s^2
    var height = $(window).height();
    var width = $(window).width() - 50;
    let sun = $(`<div class="sun id=sun"> 0 </div>`);
  
    // Start animation loop
    let intervalID = setInterval(function() {
      // Generate new ball element
      let a = Math.floor(Math.random() * 21);
      let res = Math.floor(Math.random() * 10);
      let b = res - a;
      var ball;

      if (b < 0) ball = $(`<div class="ball" id=${res}> ${a} - ${-b} </div>`);
      else ball = $(`<div class="ball" id=${res}> ${a} + ${b} </div>`);
 /*     ball = $("<svg\
      viewBox=\"0 0 50 50\" id='svg'>\
   <g id=\"kruh\" style=\"stroke: blue; fill:antiquewhite\">\
       <circle cx=\"25px\" cy=\"25px\" r=\"25px\" />\
       <text x=\"10px\" y=\"30px\">5 + 7</text>\
   </g>\
   </svg>");
   */

//   const priklad = document.querySelector('#tspan4984');
//   priklad.innerText = 'skuska';
   

      ball.css({
        top: '-10px',
        left: Math.random() * width + 'px'
      });
      $('body').append(ball);

      $(ball).animate({                   // Animujeme pohyb o 200px doprava
        "top" : `550px`
    }, {
        duration : 4000                // Trvanie: 1 sekunda
    }).promise().done(function() {
        $(this).remove();
        $(`#heart${lifes}`).remove();
        lifes--;
        
        if (lifes <= 0) {
            gameOver();
            clearInterval(intervalID);
        }
        

      });

    }, 2000); // Generate new ball every 5 seconds

    
  });

$(document).keypress(function (event) {
    let num = event.which - 48;
    triger(num);
    console.log(num);
   // alert(`You pressed a key ${num}`);
});

function triger(num) {
  var elementExists = $(`#${num}`).length > 0;

  if (elementExists) {
    $(`#${num}`).remove();
    addPoint();
   } else {
     $(`#heart${lifes}`).remove();
     lifes--;
    
      if (lifes <= 0) {
         gameOver();
          clearInterval(intervalID);
     }
    
    }
}

function addPoint() {
    mySound.play();
    const score = document.querySelector('.sun');
    currentScore = parseInt(score.innerText, 10);
    score.innerText = currentScore + 1;
}

function gameOver() {
    let over = $(`<center><div class="over"> GAME OVER </div></center>`);
    $('.ball').remove();
    $('#hr').remove();
    $('body').append(over);

}


