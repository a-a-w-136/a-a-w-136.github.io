// Restricts display on a device with a viewport of less than 320px
var body = document.querySelector("body").outerHTML;
const mql = window.matchMedia("(max-width: 319px)", "");
function screenWidthTooSmall(e)
{
    if(e.matches)
    {
        body = document.querySelector("body").outerHTML;
        document.querySelector("body").innerHTML = "<p>The screen width is too small for this application.</p>";
    }
    else
    {
        document.querySelector("body").outerHTML = body;
    }
    
}
mql.addEventListener("change", screenWidthTooSmall);