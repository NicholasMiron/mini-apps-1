
$(document).ready(function() {
  $('#textForm').submit((e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/parser',
      data: JSON.stringify(e.target[0].value),
      success: () => {
        console.log('hello');
      }
    })
  });
});