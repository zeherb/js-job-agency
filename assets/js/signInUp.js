var companies = JSON.parse(localStorage.getItem("companies")) || [],
    users = JSON.parse(localStorage.getItem("users")) || [];


function signInPage() {
    document.getElementById("sign-title").innerHTML = "Sign In"
    document.getElementById("signIn").style.display = "flex"
    document.getElementById("signUpBtns").style.display = "none"
    document.getElementById("formContent").style.height = "200px"
}
function signUpPage() {
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
        password: document.getElementById("companyPassword").value
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
        }
    }
}
