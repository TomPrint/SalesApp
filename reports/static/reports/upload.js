const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
const alertBox = document.getElementById ('alert-box')

//GLOBAL HANDLE ALERTS
const handleAlerts = (type, msg) => {
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
              ${msg}
        </div>
    `
}

Dropzone.autoDiscover = false
const myDropzone = new Dropzone('#my-dropzone', {
    url: '/reports/upload/',
    init: function() {
        this.on ('sending', function(file, xhr, formData){
            console.log('sending')
            formData.append('csrfmiddlewaretoken', csrf)
        })
        this.on('success', function(file, response){
            console.log(response)
            const ex = response.ex
            if (ex) {
                handleAlerts('danger', 'File already exists!')
//                alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
//  File already exists!
//</div>`
            } else {
                handleAlerts('success', 'File has been uploaded!')
//            alertBox.innerHTML = `<div class="alert alert-success" role="alert">
//              Your file has been uploaded!
//            </div>`
            }
        })
    },
    maxFiles: 3,
    maxFilesize: 3,
    acceptedFiles: '.csv'
})