'use strict';
// JavaScript for use with the index page.

var PicID;
var PicURL;

function loadRandomImage() {
    $(".voting-button").attr("disabled", true)
    fetch(buildUrl('/random'))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to /random succeeded: ');
            console.log(json);

            var mainImage = $('#main-image');
            mainImage.attr('src', json.url);
            mainImage.attr('alt', 'Photo Competition image, ' + json.name);
            SetImageDetails(json);
            $(".voting-button").attr("disabled", false)
            
        })
        .catch(function (err) {
            console.error('Request to /random failed: ', err);
        });
}

function SetImageDetails(json){
    $('#author-name').text(json.author);
    $('#image-name').text(json.name);
    $('#licence-info').text(json.license);
    PicID = json.id;
    PicURL = json.url;
}

function Upvote(){
    $(".voting-button").attr("disabled", true);
    $.post(buildUrl('/id/' + PicID + '/vote/up'), "", loadRandomImage);
};

function Downvote(){
    $(".voting-button").attr("disabled", true);
    $.post(buildUrl('/id/' + PicID + '/vote/down'), "", loadRandomImage);
    
};

function animation() {
    var width = "+=" + window.innerWidth / 1.5;

    function goRight() {
        $("#animate").css("transform","rotateY(0deg)").animate({
        left: width
      }, 5000, function() {
         setTimeout(goLeft, 50);
      });
    }
    function goLeft() {
        $("#animate").css("transform","rotateY(180deg)").animate({
        left: 0
      }, 5000, function() {
         setTimeout(goRight, 50);
      });
    }

    setTimeout(goRight, 50);
}

$(function () {
    loadRandomImage();
});

$(document).ready(animation);
