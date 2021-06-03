var chosenOffer = JSON.parse(localStorage.getItem("chosenOffer")),
    offers = JSON.parse(localStorage.getItem("offers")),
    offerIndex = JSON.parse(localStorage.getItem("offerIndex"));
function affichage() {
    document.getElementById("offerTitle").innerHTML = chosenOffer.title + " applications :"
    document.getElementById("applications").innerHTML = ""
    chosenOffer.applications.forEach((element, index) => {
        document.getElementById("applications").innerHTML +=
            "<tr id='application" + index + "' class='card mb-3'><td class='row g-0' ><div class='col-md-5'><div class='card-body'><h5 class='card-title'> Candidate : " +
            element.firstName + " " + element.lastName.toUpperCase() + "</h5>" +
            "<p class='card-text'>Cover Letter : " + element.coverLetter + "</p>" +
            "<p class='card-text'>Email : " + element.email + "</p>" +
            "<button type='button' class='btn  btn-primary' onclick='download()'> Download Resume</button></div></div>" +
            "<div class='card-buttons col-md-3'><strong>Status : </strong><p class='card-text'>" + element.status + "</p>" +
            "<button type='button' class='btn btn-warning' onclick='check()'>Check/Uncheck</button> </div></td></tr>"
    });
}
affichage()
function check() {
    const applicationIndex = event.target.parentNode.parentNode.parentNode.rowIndex;
    if (chosenOffer.applications[applicationIndex].status == "Checked") {
        chosenOffer.applications[applicationIndex].status = "Unchecked"
    } else {
        chosenOffer.applications[applicationIndex].status = "Checked"
    }
    localStorage.setItem("chosenOffer", JSON.stringify(chosenOffer))

    offers[offerIndex] = chosenOffer
    localStorage.setItem("offers", JSON.stringify(offers))
    location.reload()
}
function download() {
    const appIndex = event.target.parentNode.parentNode.parentNode.parentNode.rowIndex
    const resume = chosenOffer.applications[appIndex].resume
    var file = document.getElementById("file");
    file.href = resume
    file.download = chosenOffer.applications[appIndex].firstName + " " + chosenOffer.applications[appIndex].lastName
    file.click()
}