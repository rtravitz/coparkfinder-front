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
  return $.ajax({
    method: 'GET',
    url: buildParksRequest(actParams, facParams)
  })
  .done(onGetSuccess)
  .fail(onFail)
}

var addActivities = function(acts) {
  $.each(acts, function(index, activity){
    var id = activity.type + index.toString()
    $('#activities-form-options').append(
      '<p><input name="activitiesBox" type="checkbox" value="'+ activity.type +
      '" id="' + id + '"><label for="' + id + '">' + activity.type +
      '</label></p>'
    )
  });
}

var addFacilities = function(facs) {
  $.each(facs, function(index, facility){
    var id = facility.type + index.toString()
    $('#facilities-form-options').append(
      '<p><input name="facilitiesBox" type="checkbox" value="'+ facility.type +
      '" id="' + id + '"><label for="' + id + '">' + facility.type +
      '</label></p>'
    )
  });
}

var buildForm = function(){
  $('.page-data').html('')
  $('.page-data').append(
    '<div class="container"><form class="park-form"><h2>Find a Park!</h2><hr>'+
    '<h4>Activities</h4><div id="activities-form-options"></div>'+
    '<h4>Facilities</h4>'+
    '<div id="facilities-form-options"></div>'+
    '<input type="submit" value="Submit" class="btn waves-effect waves-light"'+
    '</form></div>'
  )
  $.ajax({
    method: 'GET',
    url: API + '/api/v1/facilities'
  })
  .done(addFacilities)
  .fail(onFail)

  $.ajax({
    method: 'GET',
    url: API + '/api/v1/activities'
  })
  .done(addActivities)
  .fail(onFail)
}

$(document).ready(function(){
  buildForm()
  $('form').on('submit', getParks);
  $(".button-collapse").sideNav();
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
