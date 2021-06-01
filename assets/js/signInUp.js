var companies = JSON.parse(localStorage.getItem("companies")) || [],
    users = JSON.parse(localStorage.getItem("users")) || [],
    connectedUser = JSON.parse(localStorage.getItem("connectedUser")) || null,
    connectedCompany = JSON.parse(localStorage.getItem("connectedCompany")) || null,
    demandedPage = localStorage.getItem("demanded page") || null;


function whatToShow() {
    if (connectedUser !== null || connectedCompany !== null) {
        document.getElementById("signUpUser").style.display = "none"
        document.getElementById("signUpCompany").style.display = "none"
        document.getElementById("formContent").style.height = "450px"
        document.getElementById("editProfile").style.display = "flex"
        if (connectedUser !== null) {
            document.getElementById("LnD").innerHTML = "LN"
            document.getElementById("editFirstName").value = connectedUser.firstName
            document.getElementById("editLastName").value = connectedUser.lastName
            document.getElementById("editEmail").value = connectedUser.email
            document.getElementById("editPassword").value = connectedUser.password
        } else {
            document.getElementById("LnD").innerHTML = "D"
            document.getElementById("editFirstName").value = connectedCompany.name
            document.getElementById("editLastName").value = connectedCompany.description
            document.getElementById("editEmail").value = connectedCompany.email
            document.getElementById("editPassword").value = connectedCompany.password
        }
    } else if (demandedPage == "Sign In") {
        signInPage()
    } else {
        signUpPage()
    }
}
whatToShow()



function signInPage() {
    localStorage.setItem("demanded page", "Sign In")
    document.getElementById("signInLink").setAttribute("class", "dropdown-item active")
    document.getElementById("signUpLink").setAttribute("class", "dropdown-item ")

    document.getElementById("sign-title").innerHTML = "Sign In"
    document.getElementById("signIn").style.display = "flex"
    document.getElementById("signUpBtns").style.display = "none"
    document.getElementById("signUpUser").style.display = "none"
    document.getElementById("signUpCompany").style.display = "none"
    document.getElementById("formContent").style.height = "200px"
}
function signUpPage() {
    localStorage.setItem("demanded page", "Sign Up")
    document.getElementById("signInLink").setAttribute("class", "dropdown-item")
    document.getElementById("signUpLink").setAttribute("class", "dropdown-item active")
    document.getElementById("sign-title").innerHTML = "Sign Up"
    document.getElementById("signIn").style.display = "none"
    document.getElementById("signUpBtns").style.display = "flex"
    document.getElementById("formContent").style.height = "100px"

}
function signUpAsUser() {
    document.getElementById("signUpUser").style.display = "flex"
    document.getElementById("signUpCompany").style.display = "none"
    document.getElementById("formContent").style.height = "550px"
}
function signUpAsCompany() {
    document.getElementById("signUpUser").style.display = "none"
    document.getElementById("signUpCompany").style.display = "flex"
    document.getElementById("formContent").style.height = "550px"
}
function registerCompany() {
    const company = {
        name: document.getElementById("companyName").value,
        description: document.getElementById("companyDescription").value,
        email: document.getElementById("companyEmail").value,
        password: document.getElementById("companyPassword").value,
    }
    // checking name
    var myName = company.name.trim()
    if (myName.length < 2) {
        document.getElementById("CEError").innerHTML = ""
        document.getElementById("CPWError").innerHTML = ""
        document.getElementById("CNError").innerHTML = "INVALID NAME"
        // checking password
    } else if (company.password.length < 2) {
        document.getElementById("CEError").innerHTML = ""
        document.getElementById("CNError").innerHTML = ""
        document.getElementById("CPWError").innerHTML = "INVALID PASSWORD"
        // checking e-mail existance
    } else {
        document.getElementById("CPWError").innerHTML = ""
        document.getElementById("CNError").innerHTML = ""

        var exist = false;

        companies.forEach(element => {
            if (element.email == company.email) {
                exist = true
            }
        });
        if (exist == false) {
            users.forEach(element => {
                if (element.email == company.email) {
                    exist = true
                }
            });
        }
        if (exist == true) {
            document.getElementById("CEError").innerHTML = "This e-mail already exists"
        } else {
            document.getElementById("CEError").innerHTML = ""
            companies.push(company)
            localStorage.setItem("companies", JSON.stringify(companies))
            document.getElementById("companyName").value = ""
            document.getElementById("companyDescription").value = ""
            document.getElementById("companyEmail").value = ""
            document.getElementById("companyPassword").value = ""
            localStorage.setItem("demanded page", "Sign In")
            location.reload()
        }
    }




}
function registerUser() {
    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("userEmail").value,
        password: document.getElementById("userPassword").value
    }

    // checking name
    var myFirst = user.firstName.trim(), myLast = user.lastName.trim();
    if (myFirst.length < 2) {
        document.getElementById("UEError").innerHTML = ""
        document.getElementById("UPWError").innerHTML = ""
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("FNError").innerHTML = "INVALID FIRST NAME"
        // checking password
    } else if (myLast.length < 2) {
        document.getElementById("UEError").innerHTML = ""
        document.getElementById("UPWError").innerHTML = ""
        document.getElementById("LNError").innerHTML = "INVALID LAST NAME"
        document.getElementById("FNError").innerHTML = ""
        // checking password
    }
    else if (user.password.length < 2) {
        document.getElementById("UEError").innerHTML = ""
        document.getElementById("UPWError").innerHTML = "INVALID PASSWORD"
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("FNError").innerHTML = ""
        // checking e-mail existance
    } else {
        document.getElementById("UPWError").innerHTML = ""
        document.getElementById("LNError").innerHTML = ""
        document.getElementById("FNError").innerHTML = ""

        var exist = false;
        companies.forEach(element => {
            if (element.email == user.email) {
                exist = true
            }
        });
        if (exist == false) {
            users.forEach(element => {
                if (element.email == user.email) {
                    exist = true
                }
            });
        }

        if (exist == true) {
            document.getElementById("UEError").innerHTML = "This e-mail already exists"
        } else {
            document.getElementById("UEError").innerHTML = ""
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users))
            document.getElementById("firstName").value = ""
            document.getElementById("lastName").value = ""
            document.getElementById("userEmail").value = ""
            document.getElementById("userPassword").value = ""
            localStorage.setItem("demanded page", "Sign In")
            location.reload()
        }
    }
}
function signIn() {
    const email = document.getElementById("SIEmail").value.toUpperCase(),
        password = document.getElementById("SIPassword").value;
    var thisIsACompany = false, thisIsAUser = false;
    for (var index = 0; index < companies.length; index++) {
        var compEmail = companies[index].email.toUpperCase()
        if (compEmail == email) {
            thisIsACompany = true
            break
        }
    }
    if (thisIsACompany == false) {
        for (index = 0; index < users.length; index++) {
            var userEmail = users[index].email.toUpperCase()
            if (userEmail == email) {
                thisIsAUser = true
                break
            }
        }
    } else {
        if (companies[index].password == password) {
            document.getElementById("SIEError").innerHTML = ""
            document.getElementById("SIPWError").innerHTML = ""
            localStorage.setItem("connectedCompany", JSON.stringify(companies[index]))
            document.getElementById("SIEmail").value = ""
            document.getElementById("SIPassword").value = ""
            localStorage.removeItem("demanded page")
            window.location.href = "index.html"
        } else {
            document.getElementById("SIEError").innerHTML = ""
            document.getElementById("SIPWError").innerHTML = "wrong password!"
        }
    }
    if (thisIsAUser == true) {
        if (users[index].password == password) {
            document.getElementById("SIEError").innerHTML = ""
            document.getElementById("SIPWError").innerHTML = ""
            localStorage.setItem("connectedUser", JSON.stringify(users[index]))
            document.getElementById("SIEmail").value = ""
            document.getElementById("SIPassword").value = ""
            localStorage.removeItem("demanded page")
            window.location.href = "index.html"
        } else {
            document.getElementById("SIEError").innerHTML = ""
            document.getElementById("SIPWError").innerHTML = "wrong password!"
        }
    }
    if (thisIsAUser == false && thisIsACompany == false) {
        document.getElementById("SIEError").innerHTML = "this e-mail do not exist"
        document.getElementById("SIPWError").innerHTML = ""
    }

}
function editProfile() {
    // edit company
    if (connectedCompany !== null) {
        const upValues = {
            name: document.getElementById("editFirstName").value,
            description: document.getElementById("editLastName").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value,
        }
        // checking name
        var newName = upValues.name.trim()
        if (newName.length < 2) {
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = "INVALID NAME"
            // checking password
        } else if (upValues.password.length < 2) {
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = "INVALID PASSWORD"
        } else {
            // checking email existance
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = ""
            if (upValues.email !== connectedCompany.email) {
                var exist = false
                companies.forEach(element => {
                    if (element.email == upValues.email) {
                        exist = true
                    }
                });
                if (exist == false) {
                    users.forEach(element => {
                        if (element.email == upValues.email) {
                            exist = true
                        }
                    });
                }
                if (exist == true) {
                    document.getElementById("EEError").innerHTML = "This e-mail already exists"
                } else {
                    document.getElementById("EEError").innerHTML = ""
                    connectedCompany = upValues
                    for (let index = 0; index < companies.length; index++) {
                        if (companies[index].email == connectedCompany.email) {
                            companies[index] = connectedCompany
                            break
                        }

                    }

                    localStorage.setItem("connectedCompany", JSON.stringify(connectedCompany))
                    localStorage.setItem("companies", JSON.stringify(companies))
                    document.getElementById("editFirstName").value = ""
                    document.getElementById("editLastName").value = ""
                    document.getElementById("editEmail").value = ""
                    document.getElementById("editPassword").value = ""

                    window.location.href = "index.html"
                }

            } else {
                for (let index = 0; index < companies.length; index++) {
                    if (companies[index].email == connectedCompany.email) {
                        companies[index] = upValues
                        break
                    }

                }
                upValues.offers = connectedCompany.offers
                connectedCompany = upValues
                connectedCompany = upValues
                localStorage.setItem("connectedCompany", JSON.stringify(connectedCompany))
                localStorage.setItem("companies", JSON.stringify(companies))
                document.getElementById("editFirstName").value = ""
                document.getElementById("editLastName").value = ""
                document.getElementById("editEmail").value = ""
                document.getElementById("editPassword").value = ""

                window.location.href = "index.html"
            }
        }
    }
    // edit user
    if (connectedUser !== null) {
        const upValues = {
            firstName: document.getElementById("editFirstName").value,
            lastName: document.getElementById("editLastName").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value
        }
        // checking name
        var newName = upValues.firstName.trim(), newLast = upValues.lastName.trim()
        if (newName.length < 2) {
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = ""
            document.getElementById("ELNError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = "INVALID first NAME"

        } else if (newLast.length < 2) {
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = ""
            document.getElementById("ELNError").innerHTML = "INVALID Last NAME"
            // checking password
        } else if (upValues.password.length < 2) {
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = ""
            document.getElementById("ELNError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = "INVALID PASSWORD"
        } else {
            // checking email existance
            document.getElementById("EEError").innerHTML = ""
            document.getElementById("ELNError").innerHTML = ""
            document.getElementById("EFNError").innerHTML = ""
            document.getElementById("EPWError").innerHTML = ""
            if (upValues.email !== connectedUser.email) {
                var exist = false
                companies.forEach(element => {
                    if (element.email == upValues.email) {
                        exist = true
                    }
                });
                if (exist == false) {
                    users.forEach(element => {
                        if (element.email == upValues.email) {
                            exist = true
                        }
                    });
                }
                if (exist == true) {
                    document.getElementById("EEError").innerHTML = "This e-mail already exists"
                } else {
                    document.getElementById("EEError").innerHTML = ""
                    for (let index = 0; index < users.length; index++) {
                        if (users[index].email == connectedUser.email) {
                            users[index] = upValues
                            break
                        }

                    }
                    connectedUser = upValues
                    localStorage.setItem("connectedUser", JSON.stringify(connectedUser))
                    localStorage.setItem("users", JSON.stringify(users))
                    document.getElementById("editFirstName").value = ""
                    document.getElementById("editLastName").value = ""
                    document.getElementById("editEmail").value = ""
                    document.getElementById("editPassword").value = ""

                    window.location.href = "index.html"
                }

            } else {
                for (let index = 0; index < companies.length; index++) {
                    if (users[index].email == connectedUser.email) {
                        users[index] = upValues
                        break
                    }

                }
                connectedUser = upValues
                localStorage.setItem("connectedUser", JSON.stringify(connectedUser))
                localStorage.setItem("users", JSON.stringify(users))
                document.getElementById("editFirstName").value = ""
                document.getElementById("editLastName").value = ""
                document.getElementById("editEmail").value = ""
                document.getElementById("editPassword").value = ""

                window.location.href = "index.html"
            }
        }
    }


}
