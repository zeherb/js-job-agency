var companies = JSON.parse(localStorage.getItem("companies")) || [],
    users = JSON.parse(localStorage.getItem("users")) || [],
    connectedCompany = JSON.parse(localStorage.getItem("connectedCompany")),
    offers = JSON.parse(localStorage.getItem("offers")) || [];


function affichage() {
    var imageIndex = -1
    offers.forEach(element => {
        imageIndex++
        if (connectedCompany.email == element.companyEmail) {
            document.getElementById("offers").innerHTML +=
                "<tr class='card mb-3'><td class='row g-0' ><div class='col-md-4'><img src='" + element.image + "' alt='offer image'></div>" +
                "<div class='col-md-5'><div class='card-body'><h5 class='card-title'>" + element.title + "</h5>" + "<p class='card-text'>Location : " + element.location + "</p>" +
                "<p class='card-text'>Work Time : " + element.time + "</p>" + "<p class='card-text'> Salary : " + element.salary + " DT</p>" +
                "<p class='card-text'> Contact : " + element.email + "</p>" + "<p class='card-text''><small class='text-muted'>" + element.date + "</small></p></div></div>" +
                "<div class='card-buttons col-md-3'><button type='button' class='btn btn-warning' onclick='updateVisibility()'>Update</button> <button type='button' class='btn btn-danger' onclick='deleteOffer()'>Delete</button></div></td></tr>"
        }

    });
}
affichage()


function offerVisibility() {
    document.getElementById("addUpdateBtn").innerHTML = "Add"
    document.getElementById("addUpdateBtn").setAttribute("class", "btn page-button")
    document.getElementById("addUpdateBtn").setAttribute("onclick", "addOffer()")
    document.getElementById("offersInputs").style.display = "flex"
    document.getElementById("formContent").style.minHeight = "700px"
    document.getElementById("offerEmail").value = connectedCompany.email
}

function addOffer() {
    var dat = new Date(),
        datee = dat.toLocaleDateString() + " " + dat.toLocaleTimeString();

    if (document.getElementById("offerImageInput").value == "") {
        var offerImage = ""
    } else {
        offerImage = document.getElementById("offerImageInput").files[0].name
    }

    var offer = {
        title: document.getElementById("offerTitle").value,
        location: document.getElementById("offerLocation").value,
        time: document.getElementById("offerTime").value,
        salary: document.getElementById("offerSalary").value,
        companyEmail: connectedCompany.email,
        email: document.getElementById("offerEmail").value,
        image: offerImage,
        date: datee,
        applications: []
    }
    var fileExtention = offer.image.split(".").pop()
    // checking inputs
    if (offer.title.length < 2) {
        document.getElementById("OTError").innerHTML = "invalid title"
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.location.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = "invalid location"
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.time.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = "invalid time set"
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
    } else if (offer.salary.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = "invalid salary"
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
    } else if (offer.email.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = "empty field"
        document.getElementById("OIError").innerHTML = ""
    } else if (fileExtention !== "jpg" && fileExtention !== "png" && fileExtention !== "jpeg") {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = "invalid file"
    } else {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
        const image = document.getElementById("offerImageInput").files[0],
            reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onload = () => {
            offer.image = reader.result
            offers.push(offer)
            localStorage.setItem("offers", JSON.stringify(offers))

        }


        location.reload()
    }
}

function deleteOffer() {
    var rowToDelete = event.target.parentNode.parentNode.parentNode,
        index = rowToDelete.rowIndex,
        offerCount = -1;
    rowToDelete.parentNode.removeChild(rowToDelete);
    for (let i = 0; i < offers.length; i++) {
        if (offers[i].companyEmail == connectedCompany.email) {
            offerCount++
            if (offerCount == index) {
                offers.splice(i, 1)
                break
            }
        }

    }
    localStorage.setItem("offers", JSON.stringify(offers))
}
function updateVisibility() {
    offerVisibility()
    document.getElementById("addUpdateBtn").innerHTML = "Update"
    document.getElementById("addUpdateBtn").setAttribute("class", "btn page-button-if-update btn-warning")
    document.getElementById("addUpdateBtn").setAttribute("onclick", "updateOffer()");
    rowToUpdate = event.target.parentNode.parentNode.parentNode;
    index = rowToUpdate.rowIndex;
    var offertUpdate,
        offerCount = -1;
    for (offerCountIndex = 0; offerCountIndex < offers.length; offerCountIndex++) {
        if (offers[offerCountIndex].companyEmail == connectedCompany.email) {
            offerCount++
            if (offerCount == index) {
                offertUpdate = offers[offerCountIndex]
                break
            }
        }

    };
    offertoUpdate = offertUpdate
    document.getElementById("offerTitle").value = offertoUpdate.title
    document.getElementById("offerLocation").value = offertoUpdate.location
    document.getElementById("offerTime").value = offertoUpdate.time
    document.getElementById("offerSalary").value = offertoUpdate.salary
    document.getElementById("offerEmail").value = offertoUpdate.email

}
function updateOffer() {
    var dat = new Date(),
        datee = dat.toLocaleDateString() + " " + dat.toLocaleTimeString();
    if (document.getElementById("offerImageInput").value == "") {
        var file = offers[index].image.split(";"),
            fileExtention = file[0].split("/").pop(),
            offerImage = offers[offerCountIndex].image
    } else {
        fileExtention = document.getElementById("offerImageInput").files[0].name.split(".").pop()
        offerImage = ""
    }

    var offer = {
        title: document.getElementById("offerTitle").value,
        location: document.getElementById("offerLocation").value,
        time: document.getElementById('offerTime').value,
        salary: document.getElementById("offerSalary").value,
        companyEmail: connectedCompany.email,
        email: document.getElementById("offerEmail").value,
        image: offerImage,
        date: datee,
        applications: []
    }
    // checking inputs

    if (offer.title.length < 2) {
        document.getElementById("OTError").innerHTML = "invalid title"
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.location.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = "invalid location"
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.time.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = "invalid time set"
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
    } else if (offer.salary.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = "invalid salary"
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
    } else if (offer.email.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = "empty field"
        document.getElementById("OIError").innerHTML = ""
    } else if (fileExtention !== "jpg" && fileExtention !== "png" && fileExtention !== "jpeg") {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = "invalid file"
    } else {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OLError").innerHTML = ""
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("OSError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

        var offerCount = -1;

        for (let i = 0; i < offers.length; i++) {
            if (offers[i].companyEmail == connectedCompany.email) {
                offerCount++
                if (offerCount == index) {


                    if (document.getElementById("offerImageInput").value !== "") {
                        const image = document.getElementById("offerImageInput").files[0]
                        const reader = new FileReader();
                        reader.readAsDataURL(image)
                        reader.onload = () => {
                            offer.image = reader.result
                            offer.applications = offers[i].applications
                            offers[i] = offer
                            localStorage.setItem("offers", JSON.stringify(offers))
                        }
                    } else {
                        offer.applications = offers[i].applications
                        offers[i] = offer
                        localStorage.setItem("offers", JSON.stringify(offers))
                    }

                    break
                }
            }

        }

        location.reload()
    }
}