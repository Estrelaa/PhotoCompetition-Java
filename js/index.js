'use strict';
// JavaScript for use with the index page.

var PicID;

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

            $('#author-name').text(json.author);
            $('#image-name').text(json.name);
            $('#licence-info').text(json.license);
            PicID = json.id;
            $(".voting-button").attr("disabled", false)
            
        })
        .catch(function (err) {
            console.error('Request to /random failed: ', err);
        });
}

function loadTopRatedImage() {
    fetch(buildUrl('/top'))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to /top succeeded: ');
            console.log(json);

            var topImage = $('#top-image');
            topImage.attr('src', json.url);
            topImage.attr('alt', 'Photo Competition image, ' + json.name);

            $('#author-name').text(json.author);
            $('#image-name').text(json.name);
            $('#licence-info').text(json.license);
            
        })
        .catch(function (err) {
            console.error('Request to /top failed: ', err);
        });

function Upvote(){
    $(".voting-button").attr("disabled", true)
    $.post(buildUrl('/id/' + PicID + '/vote/up'), "", loadRandomImage);
};

function Downvote(){
    $(".voting-button").attr("disabled", true)
    $.post(buildUrl('/id/' + PicID + '/vote/down'), "", loadRandomImage);
};

$(function () {
    loadRandomImage();
});
