const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function registerSubmit() {
    $("#Upload-picture").submit(function(event){
        event.preventDefault()
        $("#submit-upload-request").attr("disabled", true);
        $(".upload-feedback").text("Processing...");
        $(".upload-feedback").css("color", "darkorange");
        $("#feedback").show();

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

            $(".upload-feedback").text("Upload Sucessful");
            $(".upload-feedback").css("color", "darkgreen");
        })
        .catch((error) => {
            console.error('Error:', error);

            $(".upload-feedback").text("Upload Failed: " + error);
            $(".upload-feedback").css("color", "darkred");
        });

        $("#submit-upload-request").attr("disabled", false);
    });
}

$(document).ready(registerSubmit);