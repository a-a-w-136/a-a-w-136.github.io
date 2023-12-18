var io_nav;
window.addEventListener("load", function(event) {
  io_nav = document.querySelector("#NI_Landing_Header");

  createObserver();
}, false);

function createObserver() {
      var observer;
      var options = {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99]
      };
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(io_nav);
}
function handleIntersect(entries, observer) {

        entries.forEach(function (entry) {
            if(entry.intersectionRatio <= "0.99") {
                document.querySelector("#Main_Header_Wrapper_Background").classList.add("Main_Header_Wrapper_Background_Moved");
                document.querySelector("#Main_Header_Wrapper_Background").classList.remove("Main_Header_Wrapper_Background_Start");
                document.querySelector("#Main_Header_Wrapper").classList.add("Main_Header_Wrapper_Moved");
                document.querySelector("#Main_Header_Wrapper").classList.remove("Main_Header_Wrapper_Start");
            }
            else {
                document.querySelector("#Main_Header_Wrapper_Background").classList.remove("Main_Header_Wrapper_Background_Moved");
                document.querySelector("#Main_Header_Wrapper_Background").classList.add("Main_Header_Wrapper_Background_Start");
                document.querySelector("#Main_Header_Wrapper").classList.remove("Main_Header_Wrapper_Moved");
                document.querySelector("#Main_Header_Wrapper").classList.add("Main_Header_Wrapper_Start");
            }
        });
}
function displayMenu() {
    if(document.querySelector("#Main_Nav ul").classList.contains("Show_Menu")) {
        document.querySelector("#Main_Nav ul").classList.add("Hide_Menu");
        document.querySelector("#Main_Nav ul").classList.remove("Show_Menu");
    }
    else {
        document.querySelector("#Main_Nav ul").classList.remove("Hide_Menu");
        document.querySelector("#Main_Nav ul").classList.add("Show_Menu");
    }
}

