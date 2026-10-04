        */

        roleIndex++;


        if (
            roleIndex >=
            roles.length
        ) {

            roleIndex = 0;

        }


        setTimeout(
            typingAnimation,
            500
        );


        return;

    }


    setTimeout(
        typingAnimation,
        deleteSpeed
    );

}



/* =====================================================
   START TYPING
===================================================== */

typingAnimation();



/* =====================================================
   4. MOBILE NAVIGATION
===================================================== */

if (
    menuToggle &&
    navMenu
) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "open"
            );

        }
    );

}
