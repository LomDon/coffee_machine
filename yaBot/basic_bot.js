
// ==UserScript==
// @name         YaBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let keywords = ["Гобой","Саксофон","Валторна","Фагот","Скрипка","Флейта","Как звучит флейта"];
let keyword = keywords[getRandom(0,keywords.length)];
let i = 0;
let btnk = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
let pgnext = document.querySelectorAll('[aria-label="Следующая страница"]')[0];
let numPage= 0;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
let stop = document.querySelectorAll('[aria-label="Текущая страница 10"]')[0];

if(btnk!=undefined){
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if (i==keyword.length){
            clearInterval(timerId);
            btnk.click();
        }
    },500);
}else{
    let flag = true;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            flag = false;
            links[i].removeAttribute('target');
            setTimeout(()=>{links[i].click()},1000);
            break;
        }
    }
if(stop!=undefined) location.href = "https://yandex.ru/";
if(flag) setTimeout(()=>{pgnext.click()},1000);
}
