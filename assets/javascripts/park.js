var API = 'http://localhost:8080';

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
  $('#park-name').append(park.name)
  $('#park-description').append(park.description)
  $('#park-site').attr("href", park.url)
  $('#park-facilities').append(addFacilities(park.facilities))
  $('#park-activities').append(addActivities(park.activities))
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
