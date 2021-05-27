var companies = JSON.parse(localStorage.getItem("companies")) || [],
    users = JSON.parse(localStorage.getItem("users")) || [],
    connectedCompany = JSON.parse(localStorage.getItem("connectedCompany"));

function affichage() {
    connectedCompany.offers.forEach(element => {
        document.getElementById("offers").innerHTML +=
            "<tr class='card mb-3'><td class='row g-0' ><div class='col-md-4'><img src='assets/images/offer images/" + element.image + "' alt='offer image'></div>" +
            "<div class='col-md-5'><div class='card-body'><h5 class='card-title'>" + element.title + "</h5>" + "<p class='card-text'>" + element.decription + "</p>" +
            "<p class='card-text'> Contact : " + element.email + "</p>" + "<p class='card-text''><small class='text-muted'>" + element.date + "</small></p></div></div>" +
            "<div class='card-buttons col-md-3'><button type='button' class='btn btn-warning' onclick='updateVisibility()'>Update</button> <button type='button' class='btn btn-danger' onclick='deleteOffer()'>Delete</button></div></td></tr>"
    });
}
affichage()


function offerVisibility() {
    document.getElementById("addUpdateBtn").innerHTML = "Add"
    document.getElementById("addUpdateBtn").setAttribute("class", "btn page-button")
    document.getElementById("addUpdateBtn").setAttribute("onclick", "addOffer()")
    document.getElementById("offersInputs").style.display = "flex"
    document.getElementById("formContent").style.minHeight = "500px"
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

    const offer = {
        title: document.getElementById("offerTitle").value,
        decription: document.getElementById("offerDescription").value,
        email: document.getElementById("offerEmail").value,
        image: offerImage,
        date: datee
    }
    var fileExtention = offer.image.split(".").pop()
    // checking inputs
    if (offer.title.length < 2) {
        document.getElementById("OTError").innerHTML = "invalid title"
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.decription.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = "invalid description"
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.email.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = "empty field"
        document.getElementById("OIError").innerHTML = ""
    } else if (fileExtention !== "jpg" && fileExtention !== "png" && fileExtention !== "jpeg") {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = "invalid file"
    } else {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
        connectedCompany.offers.push(offer)
        localStorage.setItem("connectedCompany", JSON.stringify(connectedCompany))
        for (var index = 0; index < companies.length; index++) {
            if (companies[index].email == connectedCompany.email) {
                companies[index] = connectedCompany
                break
            }

        }
        localStorage.setItem("companies", JSON.stringify(companies))
        location.reload()
    }
}

function deleteOffer() {
    var rowToDelete = event.target.parentNode.parentNode.parentNode,
        index = rowToDelete.rowIndex;
    rowToDelete.parentNode.removeChild(rowToDelete);
    connectedCompany.offers.splice(index, 1)
    console.log(connectedCompany);
    localStorage.setItem("connectedCompany", JSON.stringify(connectedCompany))
    for (let i = 0; i < companies.length; i++) {
        if (companies[i].email == connectedCompany.email) {
            companies[i] = connectedCompany
            localStorage.setItem("companies", JSON.stringify(companies))
            break
        }

    }
}
function updateVisibility() {
    offerVisibility()
    document.getElementById("addUpdateBtn").innerHTML = "Update"
    document.getElementById("addUpdateBtn").setAttribute("class", "btn page-button-if-update btn-warning")
    document.getElementById("addUpdateBtn").setAttribute("onclick", "updateOffer()");
    rowToUpdate = event.target.parentNode.parentNode.parentNode;
    index = rowToUpdate.rowIndex;
    offertoUpdate = connectedCompany.offers[index];
    document.getElementById("offerTitle").value = offertoUpdate.title
    document.getElementById("offerDescription").value = offertoUpdate.decription
    document.getElementById("offerEmail").value = offertoUpdate.email

}
function updateOffer() {
    var dat = new Date(),
        datee = dat.toLocaleDateString() + " " + dat.toLocaleTimeString();
    if (document.getElementById("offerImageInput").value == "") {
        var offerImage = offertoUpdate.image
    } else {
        offerImage = document.getElementById("offerImageInput").files[0].name
    }

    const offer = {
        title: document.getElementById("offerTitle").value,
        decription: document.getElementById("offerDescription").value,
        email: document.getElementById("offerEmail").value,
        image: offerImage,
        date: datee
    }

    var fileExtention = offer.image.split(".").pop()
    // checking inputs

    if (offer.title.length < 2) {
        document.getElementById("OTError").innerHTML = "invalid title"
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.decription.length < 2) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = "invalid description"
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""

    } else if (offer.email.length < 1) {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = "empty field"
        document.getElementById("OIError").innerHTML = ""
    } else if (fileExtention !== "jpg" && fileExtention !== "png" && fileExtention !== "jpeg") {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = "invalid file"
    } else {
        document.getElementById("OTError").innerHTML = ""
        document.getElementById("ODError").innerHTML = ""
        document.getElementById("OEError").innerHTML = ""
        document.getElementById("OIError").innerHTML = ""
        connectedCompany.offers[index] = offer
        localStorage.setItem("connectedCompany", JSON.stringify(connectedCompany))
        for (let i = 0; i < companies.length; i++) {
            if (companies[i].email == connectedCompany.email) {
                companies[i] = connectedCompany
                localStorage.setItem("companies", JSON.stringify(companies))
                break
            }
        }
        location.reload()
    }
}