let ip_adresa=document.querySelector(".info .ip h2");
let lokacija=document.querySelector(".info .location h2");
let zona=document.querySelector(".info .timezone h2");
let isp=document.querySelector(".info .isp h2");
let gumb=document.querySelector("button");
let search=document.querySelector("input");

let map = L.map('map').setView([45,17],10);

L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=MGgGgs023YbGzq22JeVS',
{
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

updateMarker=(update_marker=[45,17])=>{
    map.setView(update_marker,10);
    L.marker(update_marker).addTo(map);
}

let api_url="https://geo.ipify.org/api/v2/country,city?apiKey=at_PXgjFRKdDn67oRPYPDw2QarHtJ4Dp";
get = (ip) =>{
    
    let ip_url;
    if(ip==undefined){
        ip_url=`${api_url}`;
    }
    else{
        ip_url=`${api_url}&ipAddress=${ip}`;
    }
    
    fetch(ip_url,{
        method:'GET'
    })
    .then(results=>results.json())
    .then(data=>{
        search.value="";

        ip_adresa.innerText=data.ip;
        lokacija.innerHTML=`${data.location.city}<br>${data.location.country}<br>${data.location.postalCode}`;
        zona.innerText=`UTC ${data.location.timezone}`;
        isp.innerText=data.isp;

        updateMarker([data.location.lat,data.location.lng]);
    })
    .catch(error=>alert("Please enter a valid IP Address"));
}

gumb.addEventListener("click",()=>{
    get(search.value);
});

window.addEventListener("load",()=>{
    get();
});
