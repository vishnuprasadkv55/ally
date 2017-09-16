var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
			var accessToken = "57739beafc014b10b191db000d3acf63";
		var baseUrl = "https://api.api.ai/v1/";

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage("Hi! I'm Here To Assist You For This Conjura");
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}


var colors = new Array(
    [255, 255, 255],
  [255, 237, 25],
  [191, 255, 230],
  [188, 32, 170],
  [198, 255, 168],
  [132, 247, 71]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.001;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  
  setTimeout(function() {
	  
   
	send(msg);
  }, 100 + (Math.random() * .20) * .100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function send(text) {
			$.ajax({
				type: "POST",
				url: baseUrl + "query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + accessToken
				},
				data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
				success: function(data) {
					
					/*fakeMessage(newData);*/
					var check="http";
					var flag=1;
					var res=data.result.fulfillment.speech;
					if(!res)
					{
						res="Sorry I didn't catch That";
						fakeMessage(res);
					}
					else{fakeMessage(res);
					}
					
					var img1=data.result.fulfillment.messages[1].imageUrl;
					var res1 = img1.substring(0, 4);
					if(check==res1)
					{
					fakeMessage(res,img1,res1);
					}
					/*fakeMessage(JSON.stringify(data, undefined, 2));*/
				},
				error: function() {
					fakeMessage("Internal Server Error");
				}
			});
			 
		}

function fakeMessage(text,img1,res1) {
	var check="http";
	
  if ($('.message-input').val() != '') {
    return false;
  }
  
  $('<div class="message loading new"><figure class="avatar"><img src="https://resources-api-ai.s3.amazonaws.com/ac333602-c83d-4f44-afaa-603d189cb8d9_l.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
	  if(check!=res1){
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://resources-api-ai.s3.amazonaws.com/442a49ab-1d30-471b-9876-aa0d574b1e18_l.png" /></figure>' + text + '</div>').appendTo($('.mCSB_container')).addClass('new');
	  }
	if(check==res1){
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://resources-api-ai.s3.amazonaws.com/442a49ab-1d30-471b-9876-aa0d574b1e18_l.png" /></figure>' +'<div class="zoomin">'+ '<img src="'+img1+'"height="261" width="210"/>' +'</div>'+ '</div>').appendTo($('.mCSB_container')).addClass('new');
	}
	
	
	var msg = new SpeechSynthesisUtterance(text);
window.speechSynthesis.speak(msg);
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}