var companies = JSON.parse(localStorage.getItem("companies")) || [],
    users = JSON.parse(localStorage.getItem("users")) || [],
    connectedUser = JSON.parse(localStorage.getItem("connectedUser")) || null,
    connectedCompany = JSON.parse(localStorage.getItem("connectedCompany")) || null;

function ifConnected() {
    if (connectedUser !== null) {
        document.getElementById("menu").innerHTML = connectedUser.firstName + " " + connectedUser.lastName
        while (document.getElementById("dropDownSignIn").firstChild) {
            document.getElementById("dropDownSignIn").removeChild(document.getElementById("dropDownSignIn").firstChild)
        }
        document.getElementById("dropDownSignIn").innerHTML = "<li id='editLink' class='dropdown-item'><a href='sign.html' class='dropdown-item'> Edit Profile </a><li>" +
            "<li class='dropdown-item'><a href='' class='dropdown-item' onclick='signOut()'> Sign Out </a><li>"
        var pagePath = window.location.pathname,
            pageName = pagePath.split("/").pop()
        if (pageName == "sign.html") {
            document.getElementById("editLink").setAttribute("class", "dropdown-item active")
        }

    } else if (connectedCompany !== null) {
        document.getElementById("menu").innerHTML = connectedCompany.name
        while (document.getElementById("dropDownSignIn").firstChild) {
            document.getElementById("dropDownSignIn").removeChild(document.getElementById("dropDownSignIn").firstChild)
        }
        document.getElementById("dropDownSignIn").innerHTML = "<li id='editLink' class='dropdown-item'><a href='sign.html' class='dropdown-item'> Edit Profile </a><li>" +
            "<li id='offersLink' class='dropdown-item'><a href='myOffers.html' class='dropdown-item'> My Offers </a><li>" +
            "<li class='dropdown-item'><a href='#' class='dropdown-item' onclick='signOut()'> Sign Out </a><li>"
        var pagePath = window.location.pathname,
            pageName = pagePath.split("/").pop()
        if (pageName == "sign.html") {
            document.getElementById("editLink").setAttribute("class", "dropdown-item active")
        } else if (pageName == "myOffers.html" || pageName == "applications.html") {
            document.getElementById("offersLink").setAttribute("class", "dropdown-item active")
        }
    }

}
function signOut() {
    localStorage.removeItem("connectedUser")
    localStorage.removeItem("connectedCompany")
    localStorage.setItem("demanded page", "Sign In")
    window.location.href = "sign.html"
}
function toSignInPage() {
    localStorage.setItem("demanded page", "Sign In")
}
function toSignUpPage() {
    localStorage.setItem("demanded page", "Sign Up")
}
ifConnected()
