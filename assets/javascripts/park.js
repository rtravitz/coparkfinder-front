var API = 'https://coparkfinder-api.herokuapp.com';
var MAP_KEY = 'AIzaSyA1-2s_FzT36ndMWRTSjY2fhTF1od81RJA'

var onFail = function(err){
  console.error(err);
}

var addActivities = function(activities) {
  var activitiesList = ""
  $.each(activities, function(index, activity) {
    if (index < activities.length - 1) {
      activitiesList += (activity.type + ", ")
    } else {
      activitiesList += activity.type
    }
  });
  return activitiesList
}

var addFacilities = function(facilities) {
  var facilitiesList = ""
  $.each(facilities, function(index, facility) {
    if (index < facilities.length - 1) {
      facilitiesList += (facility.type + ", ")
    } else {
      facilitiesList += facility.type
    }
  });
  return facilitiesList
}

var onGetSuccess = function(park){
  $('#park-name').append(park.name);
  $('#park-description').append(park.description);
  $('#park-site').attr("href", park.url);
  $('#park-facilities').append(addFacilities(park.facilities));
  $('#park-activities').append(addActivities(park.activities));
  $('#park-contact').append(
    '<h5>' + park.street + '</h5>' +
    '<h5>' + park.city + ', CO ' + park.zip + '</h5>' +
    '<h5>' + park.email + '</h5>'
  );
  var map_src = 'https://www.google.com/maps/embed/v1/place?key=' +
  MAP_KEY + '&q=' + park.name + ',' + park.zip
  $('.map-frame').attr("src", map_src)
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
