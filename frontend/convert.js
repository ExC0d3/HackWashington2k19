var button = document.getElementById('btn-download');
$('#btn-download').click(function(e){
  var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});