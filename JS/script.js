let dropListDiv = document.querySelector("#searchAlts");
function AddDropDiv(str) {
    let d = document.createElement("div")
    d.innerHTML = str;
    d.className = "searchAltsDiv";
    dropListDiv.appendChild(d);
    console.log(str);
}

let SubmitFunc = function (event) {
    event.preventDefault();
    console.log("hej");
};

let roomSearch = document.querySelector("#form-search");
roomSearch.addEventListener("submit", SubmitFunc, true);

document.querySelector("#searchAlts").addEventListener('scroll', function(event)
{
    let element = event.target;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 30) {
        element.classList.add("scrolled");
    } else element.classList.remove("scrolled");
});

fetch('DATA/data.json').then(response => response.json()).then(data => {
    document.querySelector("#txt-search").addEventListener("keyup", () => {
        let str = (document.querySelector("#txt-search").value);
        dropListDiv.innerHTML = "";
        let count = 0;
        data.forEach(element => {
            element.forEach(ele => {
                if (ele.room.substring(0, str.length).toLowerCase() == str.toLowerCase() && str.length > 0) {
                    AddDropDiv(ele.room);
                    count++;
                }
            });
        });
        if (count == 0) {
            document.querySelector(".searchBox").classList.remove("dropActive");
        } else if (!document.querySelector(".searchBox").classList.contains("dropActive")) {
            document.querySelector(".searchBox").classList.add("dropActive");
        }
    })
});