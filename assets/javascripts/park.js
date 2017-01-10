var API = 'http://localhost:8080';

var onFail = function(err){
  console.error(err);
}

var onGetSuccess = function(park){
  $('#park-name').append(park.name)
  $('#park-description').append(park.description)
  $('#park-site').attr("href", park.url)
  var facilities = ""
  $.each(park.facilities, function(index, facility) {
    if (index < park.facilities.length - 1) {
      facilities += (facility.type + ", ")
    } else {
      facilities += facility.type
    }
  });
  var activities = ""
  $('#park-facilities').append(facilities)
  $.each(park.activities, function(index, activity) {
    if (index < park.activities.length - 1) {
      activities += (activity.type + ", ")
    } else {
      activities += activity.type
    }
  });
  $('#park-activities').append(activities)
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
