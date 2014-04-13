$(function() {
  var socket_admin = io.connect('/admin')
    ;

  socket_admin.on('welcome',function(data){
	alert(data);
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
