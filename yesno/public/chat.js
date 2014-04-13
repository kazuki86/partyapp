$(function() {
  var socket   = io.connect()
    , $posts   = $('#count_area')
    , $answer  = $('.answer_area')
    , $title   = $('#title_area')
	, $wait    = $('#container_wait')
	, $running = $('#container_running')
	, $result  = $('#container_result')
    ;

	hideAll();
	
  socket.on('post', function(data) {
	txt = data.yescount + '/' + data.allcount;
    $posts.text(txt);
  });
  socket.on('result', function(data) {
	txt = data.yescount + '/' + data.allcount;
    $answer.text(txt);
  });
  socket.on('upd_ttl', function(data) {
    $title.text(data.title);
  });

  socket.on('state',function(state){
	if(state=='wait'){
		hideAll();
		$wait.show();
	}
	if(state=='running'){
		hideAll();
		$running.show();

	}
	if(state=='result'){
		hideAll();
		$result.show();		
	}
  });

  $('#yesbtn').on('click', function(e) {
    socket.emit('post', true);
  });
  $('#nobtn').on('click', function(e) {
    socket.emit('post', false);
  });
  $('#resetbtn').on('click', function(e) {
    socket.emit('reset', false);
  });
  $('#startbtn').on('click', function(e) {
	title = $('#qttl').val();
    socket.emit('start', title);
  });

  function hideAll(){
	$wait.hide();
	$running.hide();
	$result.hide();
  }
});
