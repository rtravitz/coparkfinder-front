var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var onGetSuccess = function(parks){
  $.each(parks, function(index, park) {
    $('#parks-list').append(
      '<div class="col sm12 m4"><div class="card brown"><div class="card-content orange-text text-lighten-5"><span class="card-title">' + park.name +
      '</span>' + '<p>' + park.description.substring(0, 300) + '</p></div>' +
      '<div class="card-action"><a href="' + park.url + '">Visit the Park</a>' +
      '</div></div></div></div>'
    );
    if ((index + 1) % 3 == 0) {
      $('#parks-list').append(
        '<div class="clearfix"></div>'
      );
    }
  });
}

var getAllParks = function(){
  return $.ajax({
    method: 'GET',
    url: API + '/api/v1/parks'
  })
  .done(onGetSuccess)
  .fail(onFail)
}

$(document).ready(function(){
  getAllParks()
  $(".button-collapse").sideNav();
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
