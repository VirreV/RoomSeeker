 fetch('DATA/data.json')
     .then(response => response.json())
     .then(data => {
         document.querySelector("#txt-search").addEventListener("keyup", () => {
             let str = (document.querySelector("#txt-search").value)
             console.log(data.floor4);
         })
    });