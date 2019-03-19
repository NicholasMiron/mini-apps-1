
$(document).ready(function() {
  $('#textForm').submit((e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/parser',
      contentType: 'application/json',
      data: e.target[0].value,
      success: (data) => {
        console.log('data', data);
        document.getElementById('app').innerHTML = data;
        document.getElementById('output').innerHTML = document.getElementById('output').innerText;
      }
    })
  });
});