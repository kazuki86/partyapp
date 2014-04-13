$(function() {
  var socket_admin = io.connect('/admin')
    , $posts   = $('#count_area')
    ;

  socket_admin.on('welcome',function(data){
	//alert(data);
  });

  socket_admin.on('post',function(data){
	txt = data.yescount + '/' + data.allcount;
    $posts.text(txt);
  });

  $('#resetbtn').on('click', function(e) {
    socket_admin.emit('reset', false);
  });
  $('#startbtn').on('click', function(e) {
	title = $('#qttl').val();
	alert('[' + title + ']で配信します');
    socket_admin.emit('start', title);
  });
});
