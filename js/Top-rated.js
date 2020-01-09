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
            SetImageDetails(json);
            
        })
        .catch(function (err) {
            console.error('Request to /top failed: ', err);
        });
    };

    function SetImageDetails(json){
        $('#author-name').text(json.author);
        $('#image-name').text(json.name);
        $('#licence-info').text(json.license);
    }

$(function () {
    loadTopRatedImage();
});