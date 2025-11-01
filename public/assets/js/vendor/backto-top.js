!(function (o) {
    "use strict";
    o(document).ready(function () {
        // Get the progress path element
        var r = document.querySelector(".rbt-progress-parent path");
        
        // Check if the element exists
        if (!r) {
            console.warn("Progress path element not found.");
            return;
        }

        var n = r.getTotalLength();
        r.style.transition = r.style.WebkitTransition = "none";
        r.style.strokeDasharray = n + " " + n;
        r.style.strokeDashoffset = n;
        r.getBoundingClientRect();
        r.style.transition = r.style.WebkitTransition = "stroke-dashoffset 10ms linear";

        function t() {
            var t = o(window).scrollTop(),
                e = o(document).height() - o(window).height();
            r.style.strokeDashoffset = n - (t * n) / e;
        }

        t();
        o(window).scroll(t);

        // Back to top functionality
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > 50) {
                jQuery(".rbt-progress-parent").addClass("rbt-backto-top-active");
            } else {
                jQuery(".rbt-progress-parent").removeClass("rbt-backto-top-active");
            }
        });

        jQuery(".rbt-progress-parent").on("click", function (t) {
            t.preventDefault();
            jQuery("html, body").animate(
                {
                    scrollTop: 0,
                },
                550
            );
            return false;
        });
    });
})(jQuery);
