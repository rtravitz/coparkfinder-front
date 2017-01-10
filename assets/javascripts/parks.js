var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var truncate = function(input) {
  var array = input.split(" ");
  var shortened = array.splice(0, 50).join(" ");
  if (array.length > 50) {
    shortened += "...";
  }
  return shortened;
}

var onGetSuccess = function(parks){
  $.each(parks, function(index, park) {
    $('#parks-list').append(
      '<div class="col sm12 m4"><div class="card brown"><div class="card-content orange-text text-lighten-5"><a href="park.html?name=' + park.name + '">' + '<span class="card-title">' + park.name +
      '</span></a>' + '<p>' + truncate(park.description)+ '</p></div>' +
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
