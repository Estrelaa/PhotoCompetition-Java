'use strict';
// JavaScript for use with the index page.

var PicID;

function loadRandomImage() {
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
            
        })
        .catch(function (err) {
            console.error('Request to /random failed: ', err);
        });
}

$('voting-button vote-up').click(function(){   
    $.post(fetch(buildUrl('/images/id/" + PicID + "/vote/up')))
});

$(function () {
    loadRandomImage();
});
