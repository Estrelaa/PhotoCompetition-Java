
function registerSubmit() {
    $("#Upload-picture").submit(function(event){
        event.preventDefault()

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        var description = $("#description").val();
        var author = $("#author").val();
        var Licence = $("#Licence").val();
        var Meta = {"name": description, "author": author, "license" : Licence}

        var blob = new Blob([JSON.stringify(Meta)], {type: "application/json"})

        formData.append("rawdata",fileField.files[0]);
        formData.append("metadata", blob);

        fetch(buildUrl(""), {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}

$(document).ready(registerSubmit);