var teams = {
  'tl-corner': 'red',
  'tr-corner': 'orange',
  'bl-corner': 'blue',
  'br-corner': 'yellow'
};
var client = new Faye.Client("/faye");
client.subscribe("/gamestart", function(message){
  console.log('game started');
  $('#waiting-div').hide();
	Game.StartCountdown();
});
var tapCounter = 0;
$("body").bind("touchstart click", function(){
	if (Game.Started) {
	  tapCounter++;
	}
});
$("#team-chooser > div").bind("click", function(){
	$("#team-chooser, #team-chooser-header").hide();
	$("#waiting-div").show();
  Game.teamId = teams[$(this).attr('id')];
  $("#team-color").text(Game.teamId).closest('h5').css('color', Game.teamId);
	client.publish("/jointeam", { teamId : Game.teamId });
});

$('body').height($(window).height());

function App() {
	var _this = this;
	this.Counter = 5;
	this.CtrInterval;
	this.Started = false;
	this.teamId = null;
	this.CountDown = function(){
		if (_this.Counter < 0) {
			clearInterval(_this.CtrInterval);
		} else if (_this.Counter == 0) {
			$("#counter").text("GO! -- Tap to Move the Ball");
			_this.Started = true;
			var sendTaps = function() {
			  if (tapCounter > 0) {
  			  client.publish("/tap", { teamId : Game.teamId, tapCount : tapCounter });
  			  tapCounter = 0;
			  }
			  setTimeout(sendTaps, 100);
			}
			setTimeout(sendTaps, 100);
		} else {
			$("#counter").text(_this.Counter--);
		}
	};
	this.StartCountdown = function(){
		$("#counter").show().text("Get READY!");
		_this.CtrInterval = setInterval(_this.CountDown, 1000);
	}; 
};
var Game = new App();