      let money = document.getElementById("money");
      let bills = document.querySelectorAll("img[src$='rub.jpg']");
      let coins = [10, 5, 2, 1];
      let bill_acc = document.getElementById("bill_acc");
      let displayInfo = document.getElementById("displayInfo");
      let balance = document.getElementById("balance");
      let changeBox = document.getElementById("changeBox");
      let progressBar = document.querySelector(".progress-bar");
      let coffeeMug = document.getElementById("coffeeMug");
      let blocker = document.getElementById("blocker");
      


      for(let i=0; i<bills.length; i++){
        bills[i].onmousedown = function(event){
          let bill = bills[i];
          bill.style.zIndex=1;
          bill.style.position="absolute";
          bill.style.transform = "rotate(90deg)";
          
          function moveAt(e){
            bills[i].style.top = e.clientY-75+"px";
            bills[i].style.left = e.clientX-75+"px";    
          }
          document.addEventListener("mousemove", moveAt)
          document.onmouseup = function(){
            document.removeEventListener("mousemove", moveAt);
            bill.style.zIndex=0;
            
            let bill_top = bill.getBoundingClientRect().top;
            let bill_right = bill.getBoundingClientRect().right;
            let bill_left = bill.getBoundingClientRect().left;

            
            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.height/3)*2;
            
            if(bill_top>bill_acc_top && bill_right<bill_acc_right && bill_left>bill_acc_left && bill_top<bill_acc_bottom){
              bill.hidden = true;
              money.value = +money.value + +bill.dataset.nominal;
              balance.innerText = "Ваш баланс: "+money.value+"руб."
            }
          }
          bill.ondragstart = function(){return false;}  
        }
      }
      
      coffeeMug.onclick = function(){
        if(this.style.opacity != 0){
          this.style.opacity = 0;
          let audio = new Audio("../audio/drink.mp3");
          audio.play();      
        }
      }


      function getCoffee(coffeeName,cost){
        if(money.value >= cost){
          blocker.style.height=window.innerHeight+"px";
          money.value -= cost;
          let audio = new Audio("../audio/coffee.mp3");
          audio.play();
          balance.innerText = "Ваш баланс: "+money.value+"руб."
          let w = 0;
          progressBar.hidden = false;
          let timerId = setInterval(function(){
            progressBar.style.width = (++w)+"%";
            coffeeMug.style.opacity = w/100;
            if (w==105){
              progressBar.hidden = true;
              progressBar.style.width = "0%";
              displayInfo.innerText = `Ваш ${coffeeName} готов!`;
              blocker.style.height=0+"px";
              clearInterval(timerId);
            }else if (w<40){
              displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> ожидайте...`;
            }else if (w<75){
              displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> ожидайте...`;
            }else{
              displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> ожидайте...`;
            }
          },100);
        }
        else
        display.innerText = "Нет денег - нет кофе!";
      }
      
      function getChange(num){
        balance.innerText = "Ваш баланс: "+0+"руб."
        for(i=0;num>0;num=num-coins[i]){
          if (num-coins[i]<0){
            i++;
          }else{
            let audio = new Audio("../audio/change.mp3");
            audio.play();
          }
          let top = getRandom(0, changeBox.offsetHeight-64);
          let left = getRandom(0, changeBox.offsetHeight-28);
          changeBox.innerHTML += `<img onclick="this.hidden=true" src="../img/${coins[i]}coin.png" style="top:${top}px; left:${left}px">`;
          console.log(coins[i]);
          }
        
  
          function getRandom(min,max){
            return Math.random()*(max-min)+min;
          }
      }