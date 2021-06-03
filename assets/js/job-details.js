var chosenOffer = JSON.parse(localStorage.getItem("chosenOffer")) || {},
    companies = JSON.parse(localStorage.getItem("companies")) || [],
    offers = JSON.parse(localStorage.getItem("offers")),
    offerIndex = JSON.parse(localStorage.getItem("offerIndex")),
    connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
function start() {
    for (let index = 0; index < companies.length; index++) {
        if (companies[index].email == chosenOffer.companyEmail) {
            var offerOwner = companies[index]
            break
        }
    }

    document.getElementById("salary").innerHTML += chosenOffer.salary;
    document.getElementById("title").innerHTML = chosenOffer.title
    document.getElementById("location").innerHTML += "<br>" + chosenOffer.location
    document.getElementById("time").innerHTML += "<br>" + chosenOffer.time
    document.getElementById("offerImage").src = chosenOffer.image
    document.getElementById("companyName").innerHTML = offerOwner.name
    document.getElementById("companyDescription").innerHTML += "<br>" + offerOwner.description
    document.getElementById("companyEmail").innerHTML = offerOwner.email
    document.getElementById("offerEmail").innerHTML = chosenOffer.email
}
start()
function applyVisibility() {
    document.getElementById("jobApplication").style.display = ""
    if (!connectedUser) {
        localStorage.setItem("demanded page", "Sign In")
        window.location.href = "sign.html"
    } else {
        document.getElementById("firstName").value = connectedUser.firstName
        document.getElementById("lastName").value = connectedUser.lastName
        document.getElementById("Email").value = connectedUser.email
    }
}
function applyForJob() {
    var application = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("Email").value,
        coverLetter: document.getElementById("coverLetter").value,
        resume: "",
        applicationOwner: connectedUser.email,
        status: "Unchecked"
    }
    // checking inputs
    if (document.getElementById("inputGroupFile01").value !== "") {
        var fileExtention = document.getElementById("inputGroupFile01").files[0].name.split(".").pop()
    } else {
        fileExtention = ""
    }

    if (document.getElementById("firstName").value.length < 2) {
        document.getElementById("FNError").innerHTML = "invalid field!"
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("EError").innerHTML = ""
        document.getElementById("FError").innerHTML = ""
        document.getElementById("existError").innerHTML = ""
    } else if (document.getElementById("lastName").value.length < 2) {
        document.getElementById("FNError").innerHTML = ""
        document.getElementById("LNError").innerHTML = "invalid field!"
        document.getElementById("EError").innerHTML = ""
        document.getElementById("FError").innerHTML = ""
        document.getElementById("existError").innerHTML = ""
    } else if (document.getElementById("Email").value.length < 2) {
        document.getElementById("FNError").innerHTML = ""
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("EError").innerHTML = "invalid field!"
        document.getElementById("FError").innerHTML = ""
        document.getElementById("existError").innerHTML = ""
    } else if (fileExtention !== "doc" && fileExtention !== "docx" && fileExtention !== "pdf" && fileExtention !== "jpeg" && fileExtention !== "jpg" && fileExtention !== "png") {
        document.getElementById("FNError").innerHTML = ""
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("EError").innerHTML = ""
        document.getElementById("FError").innerHTML = "invalid field!"
        document.getElementById("existError").innerHTML = ""
    } else {
        document.getElementById("FNError").innerHTML = ""
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("EError").innerHTML = ""
        document.getElementById("FError").innerHTML = ""
        document.getElementById("existError").innerHTML = ""
        var exist = false
        chosenOffer.applications.forEach(element => {
            if (element.applicationOwner == connectedUser.email) {
                exist = true
            }
        });
        if (exist == true) {
            document.getElementById("existError").innerHTML = "you already applyed for this job"
        } else {

            const file = document.getElementById("inputGroupFile01").files[0],
                reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                application.resume = reader.result
                chosenOffer.applications.push(application)
                offers[offerIndex] = chosenOffer
                localStorage.setItem("offers", JSON.stringify(offers))
                localStorage.setItem("chosenOffer", JSON.stringify(chosenOffer))


            }
            // location.reload()
        }
    }
}