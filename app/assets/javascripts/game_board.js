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
    for (var i = 1; i <= 4; i++) {
      $('#goal-'+i + ' .score').text(score[i-1]);
    }
    tally = [0, 0, 0, 0];
    lastTallyReset = new Date().getTime();
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

  var colors = ['red', 'blue', 'orange', 'yellow'];
  var joined = [0, 0, 0, 0];
  var started = false;
  var client = new Faye.Client('/faye');
  client.subscribe('/jointeam', function(data) {
    joined[colors.indexOf(data.teamId)]++;
    console.log('joined team ' + data.teamId);

    if (started) {
      client.publish('/gamestart', {});

    } else {
      var ready = true;
      // $.each(joined, function(i, count) {
      //   if (count == 0) {
      //     ready = false;
      //   }
      // });

      if (ready) {
        client.subscribe('/tap', function(data) {
          console.log('tap: ' + data.teamId)
          tally[colors.indexOf(data.teamId)]++;
        });
        client.publish('/gamestart', {});
        console.log('starting game');
        started = true;
      }
    }
  });
});