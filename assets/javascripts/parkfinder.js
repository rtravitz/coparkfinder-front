var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var onGetSuccess = function(parks){
  parksObj = JSON.parse(parks)
  $.each(parksObj, function(index, park) {
    $('#parks-list').append(
      '<div class="col sm12 m4"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">' + park.name +
      '</span>' + '<p>' + park.description.substring(0, 300) + '</p></div>' +
      '<div class="card-action"><a href="' + park.url + '">Visit the Park</a>' +
      '</div></div></div></div>'
    );
  });
}

var getAllParks = function(){
  return $.ajax({
    method: 'GET',
    crossDomain: true,
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
