var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var buildParksRequest = function(acts, facs) {
  queryUrl = API + '/api/v1/parks?'
  if (acts.length > 0) {
    acts = "activities='" + acts + "'"
    queryUrl = queryUrl + acts
  }
  if (acts.length > 0 && facs.length > 0) {
    queryUrl = queryUrl + '&'
  }
  if (facs.length > 0) {
    facs = "facilities='" + facs + "'"
    queryUrl = queryUrl + facs
  }
  return queryUrl
}

var onGetSuccess = function(parks){
  $('.page-data').html('')
  $.each(parks, function(index, park) {
    $('.page-data').append(
      '<div class="col sm12 m4"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">' + park.name +
      '</span>' + '<p>' + park.description.substring(0, 300) + '</p></div>' +
      '<div class="card-action"><a href="' + park.url + '">Visit the Park</a>' +
      '</div></div></div></div>'
    );
  });
}

var getParks = function(){
  var facParams = $('input[name="facilitiesBox"]:checked').map(
    function() {return this.value;}).get().join("','")
  var actParams = $('input[name="activitiesBox"]:checked').map(
    function() {return this.value;}).get().join("','")
  console.log(facParams);
  console.log(actParams);
  return $.ajax({
    method: 'GET',
    url: buildParksRequest(actParams, facParams)
  })
  .done(onGetSuccess)
  .fail(onFail)
}

$(document).ready(function(){
  $('form').on('submit', getParks);
  $(".button-collapse").sideNav();
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
