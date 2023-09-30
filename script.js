const endpoint ="https://api.nasa.gov/planetary/apod";
const key ="88o4vQRAgVdRW91YzXHUDffDcNRg75nagMKJ21Zy";

const currdate = new Date().toISOString().split("T")[0];
// console.log(currdate)

const mainhead = document.querySelector("#current-image-container>h1");
const img = document.querySelector("#current-image-container>img")
const contenthead = document.getElementById("contentHead");
const para = document.getElementsByClassName("para")[0];
const inputdate = document.getElementById("input");
const searchbutton = document.getElementById("search");
const ullist = document.getElementById("search-history");

async function getCurrentImageOfTheDay(){
    let url = `${endpoint}?date=${currdate}&api_key=${key}`;
    try{
    let response = await fetch(url);
    let result = await response.json();
    setDataToUi(result);
    }
    catch(error){
      window.alert("failed to fetch data");
    }
}

getCurrentImageOfTheDay();

function setDataToUi(result){
    if(currdate!=result.date){
        mainhead.innerText=`Picture On ${result.date}`
    }
    img.src=result.hdurl;
    contenthead.innerText =result.title;
    para.innerText = result.explanation;
}

searchbutton.addEventListener("click",(e)=>{
     e.preventDefault();
     if(inputdate.value){
        getImageOfTheDay(inputdate.value);
        //console.log(typeof inputdate.value)
         saveSearch(inputdate.value);
         addSearchToHistory();
     }
});

async function getImageOfTheDay(date){
    let url = `${endpoint}?date=${date}&api_key=${key}`;
    try{
    let response = await fetch(url);
    let result = await response.json();
    setDataToUi(result);
    }
    catch(error){
      window.alert("failed to fetch data on given date");
    }
}

function saveSearch(value){
    let datearr = localStorage.getItem('date');
    console.log(typeof datearr);

    if(datearr){
        let tmparr = JSON.parse(datearr);
        tmparr.push(value);
        localStorage.setItem('date',JSON.stringify(tmparr));
    }
    else{
        let tmparr = [];
        tmparr.push(value)
        localStorage.setItem('date',JSON.stringify(tmparr));
    }
}

  function addSearchToHistory(){
    let datearr = localStorage.getItem('date');
     if(datearr){
        let tmparr = JSON.parse(datearr);
        tmparr.forEach( element=>{
         let li = document.createElement("li");
         let a = document.createElement("a");
         a.innerText=element;
         a.href="";
         li.append(a);
         ullist.append(li);
        })
     }
 }
 addSearchToHistory();
