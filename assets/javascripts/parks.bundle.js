/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);