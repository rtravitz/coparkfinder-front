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
  if (parks.length > 0) {
    $.each(parks, function(index, park) {
      $('.page-data').append(
        '<div class="col sm12 m4"><div class="card brown"><div class="card-content white-text"><span class="card-title">' + park.name +
        '</span>' + '<p>' + park.description.substring(0, 300) + '</p></div>' +
        '<div class="card-action"><a href="' + park.url + '">Visit the Park</a>' +
        '</div></div></div></div>'
      );
      if (index + 1 % 3 == 0) {
        $('.page-data').append(
          '<div class="clearfix"></div>'
        );
      }
    });
  } else {
    $('.page-data').append( "<div class=\"container\"><h3>Oh, no! Your dream park doesn't exist!</h3><p>Why don't you try to search again...</p></div>")
  }
}

var getParks = function(){
  var facParams = $('input[name="facilitiesBox"]:checked').map(
    function() {return this.value;}).get().join("','")
  var actParams = $('input[name="activitiesBox"]:checked').map(
    function() {return this.value;}).get().join("','")
  $('.page-data').html('').append('<a href="search.html" class="btn waves-effect waves-light">Search Again</a>')
  return $.ajax({
    method: 'GET',
    url: buildParksRequest(actParams, facParams),
    beforeSend: function() {
      $('#loading-tree').css("display", "block");
    },
    complete: function() {
      $('#loading-tree').css("display", "none");
    }
  })
  .done(onGetSuccess)
  .fail(onFail)
}

var addActivities = function(acts) {
  $.each(acts, function(index, activity){
    var id = activity.type + index.toString()
    $('#activities-form-options > .row').append(
      '<div class="col sm1 md1"><input name="activitiesBox" type="checkbox" value="'+ activity.type +
      '" id="' + id + '"><label for="' + id + '">' + activity.type +
      '</label></div>'
    )
  });
}

var addFacilities = function(facs) {
  $.each(facs, function(index, facility){
    var id = facility.type + index.toString()
    $('#facilities-form-options > .row').append(
      '<div class="col sm1 md1"><input name="facilitiesBox" type="checkbox" value="'+ facility.type +
      '" id="' + id + '"><label for="' + id + '">' + facility.type +
      '</label></div>'
    )
  });
}

var buildForm = function(){
  $('.page-data').html('')
  $('.page-data').append(
    '<div class="container"><form class="park-form"><h3>Find a Park!</h3><hr>'+
    '<h4>Activities</h4><div id="activities-form-options"><div class="row"></div></div>'+
    '<h4>Facilities</h4>'+
    '<div id="facilities-form-options"><div class="row"></div></div>'+
    '<input type="submit" value="Submit" class="btn waves-effect waves-light">'+
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
