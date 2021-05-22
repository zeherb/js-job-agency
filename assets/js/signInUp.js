
function multiDropdown() {
    $(".multi-level-dropdown .dropdown-submenu > a").on(
        "click",
        function (e) {
            var submenu = $(this);
            $(
                ".multi-level-dropdown .dropdown-submenu .dropdown-menu"
            ).removeClass("show");
            submenu.next(".dropdown-menu").addClass("show");
            e.stopPropagation();
        }
    );
    $(".multi-level-dropdown .dropdown").on(
        "hidden.bs.dropdown",
        function () {
            // hide any open menus when parent closes
            $(".multi-level-dropdown .dropdown-menu.show").removeClass("show");
        }
    );
    if ($(window).width() < 992) {
        document.getElementById("dropDownSignIn").classList.remove("dropstart")
        var menu = document.getElementById("dropDownSignIn"),
            lists = menu.getElementsByClassName("signINUP"),
            links = menu.getElementsByTagName("a");

        for (let index = lists.length - 1; index >= 0; index--) {
            lists[index].parentNode.removeChild(lists[index]);

        }
        for (let index = 0; index < links.length; index++) {
            links[index].classList.remove("dropdown-toggle")
            links[index].setAttribute("href", "sign.html")
        }

    }

}
multiDropdown()
