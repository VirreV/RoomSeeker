let dropListDiv = document.querySelector("#searchAlts");
function AddDropDiv(roomNr, nameStr) {
    let d = document.createElement("div");
    d.className = "searchAltsDiv";
    let room = document.createElement("div");
    room.innerHTML = roomNr;
    let name = document.createElement("div");
    name.innerHTML = nameStr;
    d.appendChild(room);
    d.appendChild(name);
    dropListDiv.appendChild(d);
    console.log(roomNr, nameStr);
    let refDiv = document.querySelector("#searchAlts");
    let overlapDiv = document.querySelector("#overlap");
    overlapDiv.style.height = refDiv.style.height;
}

let SubmitFunc = function (event) {
    event.preventDefault();
    console.log("hej");
};

let roomSearch = document.querySelector("#form-search");
roomSearch.addEventListener("submit", SubmitFunc, true);

document.querySelector("#searchAlts").addEventListener('scroll', function(event)
{
    CheckScroll(event.target);
});

function CheckScroll(element){
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 30) {
        document.querySelector("#overlap").classList.add("scrolled");
    }else document.querySelector("#overlap").classList.remove("scrolled");
}

fetch('DATA/data.json').then(response => response.json()).then(data => {
    document.querySelector("#txt-search").addEventListener("keyup", () => {
        let str = (document.querySelector("#txt-search").value);
        dropListDiv.innerHTML = "";
        let count = 0;
        data.forEach(element => {
            element.forEach(ele => {
                if ((ele.room.substring(0, str.length).toLowerCase() == str.toLowerCase() || ele.name.substring(0, str.length).toLowerCase() == str.toLowerCase()) && str.length > 0) {
                    AddDropDiv(ele.room, ele.name);
                    count++;
                }
            });
        });
        if (count == 0) {
            document.querySelector(".searchBox").classList.remove("dropActive");
        } else if (!document.querySelector(".searchBox").classList.contains("dropActive")) {
            document.querySelector(".searchBox").classList.add("dropActive");
        }
        console.log(document.querySelector("#searchAlts").childElementCount);
        if(document.querySelector("#searchAlts").childElementCount < 7){
            document.querySelector("#overlap").classList.add("scrolled");
        } else CheckScroll(document.querySelector("#searchAlts"));
    })
});