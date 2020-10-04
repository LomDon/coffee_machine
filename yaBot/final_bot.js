
// ==UserScript==
// @name         YaBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Саксофон","Валторна","Фагот","Скрипка","Флейта","Как звучит флейта"],
     "https://crushdrummers.ru/": ["Барабанное шоу", "Шоу барабанщиков в Москве","Заказать барабанщиков в Москве"]
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let i = 0;
let btnk = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
let pgnext = document.querySelectorAll('[aria-label="Следующая страница"]')[0];
let stop = document.querySelectorAll('[aria-label="Текущая страница 10"]')[0];

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if(btnk!=undefined){
   document.cookie = "site="+site;
   }else{
       site = getCookie("site");
   }

if(btnk!=undefined){
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if (i==keyword.length){
            clearInterval(timerId);
            btnk.click();
        }
    },500);
}else if(location.hostname == "yandex.ru"){
    let flag = true;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(links[i].href.indexOf(site)!=-1){
            flag = false;
            links[i].removeAttribute('target');
            setTimeout(()=>{link.click()},1000);
            break;
        }
    }

if(stop!=undefined) location.href = "https://yandex.ru/";
if(flag) setTimeout(()=>{pgnext.click()},1000);

}else{
    if(getRandom(0,100)>=80){
        location.href = "https://yandex.ru/";
    }else{
        let links = document.links;
        setInterval(()=>{
            let index = getRandom(0,links.length);
            console.log("Я не умер, я ещё живой! Проверяю ссылку: "+links[index]);
            if (links[index].href.indexOf(location.hostname) != -1){
            links[index].click();
            }
        },5000)
    }
}
