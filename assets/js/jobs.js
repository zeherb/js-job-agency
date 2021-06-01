const offers = JSON.parse(localStorage.getItem("offers")) || [];

function affichage() {
    document.getElementById("pageContent").innerHTML = "";
    offers.forEach(element => {
        document.getElementById("pageContent").innerHTML +=
            "<div class='col-md-4 aOffer'><div class='service-item'><img src='" + element.image + "' alt='' />" +
            " <div class='down-content'> <h4>" + element.title + "</h4><div style='margin-bottom: 10px'>" +
            "<span><sup>DT</sup>" + element.salary + "</span></div><p>" + element.location + "</p>" +
            "<a href='#' class='filled-button' onclick='jobDetail()'>View More</a></div></div><br /></div>"
    });
}
affichage()

function search() {
    var searchText = document.getElementById("search").value.toUpperCase(),
        content = document.getElementById("pageContent"),
        pageOffers = content.getElementsByClassName("aOffer");

    for (let index = 0; index < offers.length; index++) {
        const element = offers[index],
            title = element.title.toUpperCase(),
            location = element.location.toUpperCase(),
            salary = element.salary.toUpperCase();

        if (title.indexOf(searchText) == -1 && location.indexOf(searchText) == -1 &&
            salary.indexOf(searchText) == -1) {
            pageOffers[index].style.display = "none"
        } else {
            pageOffers[index].style.display = ""
        }
    };

}