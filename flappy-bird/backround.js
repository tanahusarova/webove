let intervalID;
var lifes = 3;
var jump
let myAudio = new Audio('cartoon-jump.mp3');
let end = false;
$(document).ready(function() {

    var width = $(window).width();
    var i = 0;



    intervalID = setInterval(function() {
        i++;
        console.log('vytvorene' + i);

  
        let height_top = Math.random() * 300 + 50;
        let height_middle = Math.random() * 400 + 50;
  
  
  
        var column_top = `<div class="column" id="top${i}" style="top:-30px;height:${height_top}px"></div>`;
        var hole1 = `<div class="hole" id="right"><center>2 + 7 = 9</center></div>`
        var column_middle = `<div class="column" id="middle${i}" style="height:${height_middle}px"></div>`;
        var hole2 = `<div class="hole" id="false"><center>2 + 5 = 6</center></div>`;
        var column_bottom = `<div class="column" id="bottom${i}"></div>`;
  
        var column = $(`<div id="${i}" class="container">${column_top}${hole1}${column_middle}${hole2}${column_bottom}</div>`);
  
        column.css({
            left: `1200px`
          });

      $('body').append(column);
      console.log('appendnute' + i);


      $(column).animate({                   // Animujeme pohyb o 200px doprava
        "left" : `-200px`
    }, {
        duration : 10000,
        complete : function()           // Po dobehnutí animácie
        {
            $(column).remove();
            console.log('vymazane' + i);
        }             
    })

    }, 5000); 

    intervalIDcheck = setInterval(function() {
        detectOverlaping($('.container'));
    }, 500); 

    var height = 1000;

    $(".bird").css({
        top: '200px',
        left: '0px'
      });
    
    $(".bird").animate({                   // Animujeme pohyb o 200px doprava
        "left" : `400px`
    }, 4000);


    $(".bird").animate({                   // Animujeme pohyb o 200px doprava
        "top" : `1000px`

    }, {
        duration : 10000            
    }).promise().done(function() {
        let p = $(".bird").position();
        console.log('prave sa nachadzam v animate ' + p.top)
        if (p.top < 990) return;
        
        console.log('smrt');
        gameOver();
        clearInterval(intervalID);
 
      });
    
  });

function triger(num) {
    $(`#${num}`).remove();
    addPoint();
}

function addPoint() {
    const score = document.querySelector('.sun');
    currentScore = parseInt(score.innerText, 10);
    score.innerText = currentScore + 1;
}

function gameOver() {
    if (end) return;
    end = true;
    let over = $(`<center><div class="over"> GAME OVER </div></center>`);
    $('.container').remove();
    $('body').append(over);

}

function detectOverlaping(item) {
    if (item === undefined) return;
    console.log(item);

    let pos = $(item).position();
    let bird = $(`.bird`).position();
    console.log(pos.left);
    console.log(bird.left);



    if (!(pos.left <= (bird.left + 95) && (bird.left + 95) <= (pos.left + 95))
        && !(pos.left <= (bird.left) && (bird.left) <= (pos.left + 95)))
        
        return 0; //false
    /*
    var postop, posmiddle, posbottom, width, height;
    postop = $(`#top${i}`).position();
    posmiddle = $(`#middle${i}`).position();
    posbottom = $(`#bottom${i}`).position();

    var bordertop = postop.left;
    var bordermiddle = posmiddle.left;
    var borderbottom = posbottom.left;
    */

    var posright = $(item).children(`#right`).position();
    console.log(bird.top, bird.top + 80);
    console.log(posright.top, posright.top + 100);
    if (bird.top >= posright.top && (bird.top + 80) <= (posright.top + 100)) {
        const score = document.querySelector('.sun');
        currentScore = parseInt(score.innerText, 10);
        score.innerText = currentScore + 1;
        return;

    }

    var posfalse = $(item).children(`#false`).position();
    console.log(bird.top, bird.top + 80);
    console.log(posfalse.top, posfalse.top + 100);
    if (bird.top >= posfalse.top && (bird.top + 80) <= (posfalse.top + 100)){
        $(`#heart${lifes}`).remove();
        lifes--;
        
        if (lifes <= 0) {
            gameOver();
            clearInterval(intervalID);
        }
    }

    console.log('som tu mal by som byt v stlpe')
//   gameOver();
//    clearInterval(intervalID);

}


$(document).keypress(function(event) {
    // Check if the pressed key is the space key
    console.log('pressed space key')
    event.preventDefault();
    if (event.which === 32) {
        $(".bird").stop(true, false);
        var position = $('.bird').position();
        console.log('position '+ position.top);
        console.log( 'offset ' + $('.bird').offset().top);

        var top = position.top - 50;
        myAudio.play();

        $(".bird").animate({ top: `${top}px` }, 500);
        $(".bird").animate({                   // Animujeme pohyb o 200px doprava
            top : `1000px`
        }, 10000).promise().done(function() {
            let p = $(".bird").position();
            console.log('prave sa nachadzam v animate po skoku ' + p.top)
            if (p.top < 990) return;

            console.log('smrt');
            gameOver();
            clearInterval(intervalID);
     
           });

        
    }

    else myAudio.play();

}
)


