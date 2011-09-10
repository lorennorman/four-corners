// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require dollar
//= require app
//= require sudoku
//= require solver
//= require generator

$(function() {
  var hitWidth  = $('#goal-1').width() / 2;
  var win       = $(window);
  var ball      = $('#ball');

  ball.css({left: (win.width() - ball.width())/2, top: (win.height() - ball.height())/2});

  var score = [0, 0, 0, 0];
  var tally = [0, 0, 0, 0];
  var currentHighScorer = -1;
  var lastTallyReset = new Date().getTime();

  function resetMatch() {
    tally = [0, 0, 0, 0];
    currentHighScorer = -1;
    ball.stop();
    ball.css({left: (win.width() - ball.width())/2, top: (win.height() - ball.height())/2});
  }

  function gameLoop() {
    var offset = ball.offset();

    if (offset.left < hitWidth) {
      if (offset.top < hitWidth) {
        score[0]++;
        resetMatch();

      } else if ((offset.top + ball.height()) > (win.height() - hitWidth)) {
        score[1]++;
        resetMatch();
      }

    } else if ((offset.left + ball.width()) > (win.width() - hitWidth)) {
      if (offset.top < hitWidth) {
        score[2]++;
        resetMatch();

      } else if ((offset.top + ball.height()) > (win.height() - hitWidth)) {
        score[3]++;
        resetMatch();
      }
    }

    var highScorer = -1;
    var highScore  = -1;
    $.each(tally, function(i, score) {
      if (score > 0 && highScore < score) {
        highScorer = i;
        highScore  = score;
      }
    });
    if (highScorer >= 0 && highScorer != currentHighScorer) {
      currentHighScorer = highScorer;
      ball.stop();
      switch (highScorer) {
        case 0:
          ball.animate({left: 0, top: 0}, 7000);
          break;
        case 1:
          ball.animate({left: 0, top: win.height()}, 7000);
          break;
        case 2:
          ball.animate({left: win.width(), top: 0}, 7000);
          break;
        case 3:
          ball.animate({left: win.width(), top: win.height()}, 7000);
          break;
      }
    }

    if ((new Date().getTime() - lastTallyReset) > 1000) {
      tally = [0, 0, 0, 0];
      lastTallyReset = new Date().getTime();
    }

    setTimeout(gameLoop, 100);
  }
  setTimeout(gameLoop, 100);

  $.each([1,2,3,4], function(i) {
    $('#goal-'+(i+1)).click(function() {
      tally[i]++;
    });
  });
});