var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var onGetSuccess = function(park){
  $('#page-data').append(
    '<div class="col sm12 m4"><div class="card brown"><div class="card-content orange-text text-lighten-5"><a href="park.html?name=' + park.name + '">' + '<span class="card-title">' + park.name +
    '</span></a>' + '<p>' + park.description + '</p></div>' +
    '<div class="card-action"><a href="' + park.url + '">Visit the Park</a>' +
    '</div></div></div></div>'
  );
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getPark = function(){
  return $.ajax({
    method: 'GET',
    url: API + '/api/v1/park?name=' + getParameterByName("name")
  })
  .done(onGetSuccess)
  .fail(onFail)
}

$(document).ready(function(){
  getPark()
  $(".button-collapse").sideNav();
});
