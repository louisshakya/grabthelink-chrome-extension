
let myLinks = []
let myTitles = []
let inputTitles = []
let isVisible = false
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const saveInputButton = document.getElementById("input-btn")
const deleteAll = document.getElementById("deleteAll-btn")
const autoLinkButton = document.getElementById("auto-link-btn")
const searchButton = document.querySelector(".search")
const searchSvg = document.querySelector(".search-icon-div")
const eraseSvg = document.querySelector(".erase-svg")
const searchInput = document.getElementById("searchInput-el")

eraseSvg.addEventListener("click", function() {
    searchInput.value = ""
})

searchSvg.addEventListener("click",function() {
    searchButton.classList.toggle("active")
    inputEl.classList.toggle("active")
    console.log(isVisible)
    if (isVisible === false) {
        eraseSvg.setAttribute("style","visibility: visible")
        isVisible = true
        console.log(isVisible)
    } else {
        eraseSvg.setAttribute("style","visibility: hidden")
        isVisible = false
        console.log(isVisible)
    }
})

autoLinkButton.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myTitles.push(tabs[0].title)
        localStorage.setItem("myTitles", JSON.stringify(myTitles))
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myTitles, myLinks)
      });
})

saveInputButton.addEventListener("click", function() {
    if(inputEl.value == "") {
        return
    }
    myTitles.push(inputEl.value)
    localStorage.setItem("myTitles",JSON.stringify(myTitles))
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myTitles, myLinks)
      });
    inputEl.value = ""
})

const storedLinks = JSON.parse(localStorage.getItem("myLinks"))
const storedTitles = JSON.parse(localStorage.getItem("myTitles"))


if (storedLinks && storedTitles) {
    myTitles = storedTitles
    myLinks = storedLinks
    render(myTitles, myLinks)
}

function render(titles, links) {
    let listItems = ""
    let counter = 0
    for (let i = links.length-1; i >= 0; i--) {
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'>
                ${titles[i]}
            </a>
            <svg class="delete-button-svg" id="${i}" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.000000 300.000000">
             <g id="delete-icon" transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
             fill="#000000" stroke="none">
             <path id="path" d="M1330 2495 c-19 -7 -45 -14 -57 -14 -12 -1 -39 -8 -60 -17 -92 -39
             -109 -47 -123 -55 -8 -4 -32 -17 -54 -29 -106 -58 -258 -195 -339 -306 -44
             -62 -137 -241 -137 -267 0 -10 -5 -27 -11 -38 -51 -95 -65 -341 -29 -485 20
             -81 32 -115 56 -171 8 -17 14 -38 14 -47 0 -24 38 -132 68 -196 26 -54 97
             -156 136 -196 36 -36 129 -100 176 -121 122 -55 307 -70 436 -36 60 16 69 16
             166 0 127 -21 188 -22 303 -1 99 18 197 50 255 85 8 5 22 12 30 16 8 3 33 20
             55 36 167 126 265 353 265 617 1 68 5 101 15 114 19 25 19 53 0 90 -14 27 -14
             36 2 97 15 58 16 78 5 141 -23 143 -45 204 -113 313 -13 22 -33 57 -44 78 -37
             71 -169 200 -235 230 -8 4 -28 16 -45 27 -45 29 -174 90 -190 90 -7 0 -26 6
             -42 14 -15 8 -58 21 -95 30 -85 21 -356 21 -408 1z m660 -383 c35 -34 40 -45
             40 -82 0 -42 -19 -90 -61 -155 -10 -16 -22 -37 -26 -45 -3 -8 -29 -52 -57 -98
             -28 -45 -56 -90 -61 -100 -6 -9 -23 -36 -38 -59 -15 -24 -27 -47 -27 -53 0
             -11 114 -166 136 -185 6 -5 40 -48 75 -94 130 -172 138 -193 99 -256 -28 -46
             -62 -65 -113 -65 -35 0 -49 6 -78 33 -39 38 -93 103 -164 197 -60 81 -106 130
             -119 130 -6 -1 -51 -56 -101 -122 -49 -67 -129 -168 -178 -224 -77 -90 -92
             -103 -127 -109 -55 -9 -92 1 -124 34 -22 23 -27 38 -28 79 0 46 5 57 46 111
             26 33 52 66 59 73 7 7 37 45 67 83 30 39 60 76 67 83 7 8 27 35 45 60 17 26
             34 49 38 52 3 3 21 27 38 54 32 47 32 49 15 70 -37 44 -211 214 -278 272 l-70
             61 0 61 c0 51 4 64 26 86 34 34 101 44 149 23 44 -20 88 -57 220 -184 58 -57
             110 -103 116 -103 11 0 54 51 67 80 4 8 16 29 27 45 11 17 24 39 30 50 6 11
             26 47 45 80 19 33 39 70 45 82 14 34 79 73 122 73 29 0 46 -8 78 -38z"/>
             </g>
            </svg>
        </li>`
        {counter++}
    }
    ulEl.innerHTML = listItems
    let deleteButtonSvg = document.getElementsByClassName("delete-button-svg")
    for (let i = 0; i < deleteButtonSvg.length; i++) {
        deleteButtonSvg[i].getElementById("path").addEventListener("click", function(){
            let index = deleteButtonSvg[i].getAttribute("id")
            deleteLink(index)
        })
    }
    console.log("inside render",myLinks[0])
    if (myLinks != "" && myTitles != "") {
        ulEl.setAttribute("style","display: block")
    } else {
        ulEl.setAttribute("style","display: none")
    }
}

function deleteLink(index){
    myTitles.splice(index, 1);
    localStorage.setItem("myTitles",JSON.stringify(myTitles));
    myLinks.splice(index, 1);
    localStorage.setItem("myLinks",JSON.stringify(myLinks));
    render(myTitles, myLinks)
}

deleteAll.addEventListener("click", function(){
    localStorage.clear()
    myLinks = []
    myTitles = []
    render(myTitles, myLinks)
})
