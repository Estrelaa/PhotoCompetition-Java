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

        SendRequestToServer(formData)

        $("#submit-upload-request").attr("disabled", false);
    });
}

function DisplayErrorMessegeToUser(response){
    if (response.status == 400) {
        $(".upload-feedback").text("Upload Failed: error 400, invalid input" );
        $(".upload-feedback").css("color", "darkred");
    }         
    if (response.status == 404){
        $(".upload-feedback").text("Upload Failed: Error 404, please try again!");
        $(".upload-feedback").css("color", "darkred");
    }   
    if (response.status == 413){
        $(".upload-feedback").text("Upload Failed: Error 413, the image you are uploading is too large!");
        $(".upload-feedback").css("color", "darkred");
    } 
    else {
        $(".upload-feedback").text("Upload Failed, no error details found");
        $(".upload-feedback").css("color", "darkred");
    }        
}
function SendRequestToServer(FormData) {
    fetch(buildUrl(""), {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.status !== 200) {
            DisplayErrorMessegeToUser(response)
        }
        return response.json();
    })
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
}

$(document).ready(registerSubmit);