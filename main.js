let xp =0;
let health =100;
let gold=60;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory =['stick'];

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterstats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const weapons = [
    {
        name:'stick',
        power:5
    },
    {
        name:'dagger',
        power:30
    },
    {
        name:'claw hammer',
        power:50
    },
    {
        name:'sword',
        power:100
    }
]

const monsters = [
    {
        name:'slime',
        level:2,
        health:15
    },
    {
        name:'fanged beast',
        level:8,
        health:60
    },
    {
        name:'dragon',
        level:20,
        health:300
    }
]
const locations =[
    {
        name:'Town Square',
        "button text":['Go to the store','Go to the cave','Fight the dragon'],
        "button functions":[gostore,gocave,fightDragon],
        text:'You are in the town square, you see a sign that says "Store" and another that says "Cave". In the distance you see a large mountain.'
    },

    {
        name:'Store',
        "button text":['Buy 10 health (10 gold)','Buy weapon (30 gold)','Go to the town'],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:'You enter the store, you see a sign that says "Health for sale (10 gold)" and another that says "Weapons for sale (30 gold)".'
    },
    {
        name:'cave',
        "button text":['Fight Slime','Fight Fanged beast','Go to town square'],
        "button functions":[fightSlime,fightBeast,goTown],
        text:'You enter the cave, it is dark and you see two paths. One path has a sign that says "Slime" and the other has a sign that says "Fanged Beast".'
    },
    {
        name:'fight',
        "button text":['Attack','Dodge','Run'],
        "button functions":[attack, dodge, goTown],
        text:'You are fighting a monster.'
    },
    {
        name:'kill monster',
        "button text":['Go to town square','Go to the store','Go to the cave'],
        "button functions":[goTown,gostore,easterEgg],
        text:'After defeating the monster you find some gold and gain some experience.'
    },
    {
        name:'lose',
        "button text":['Go to town square','Go to the store','Go to the cave'],
        "button functions":[restart,restart,restart],
        text:'you die.'
    },
    {
        name:'win',
        "button text":['Restart','Restart','Restart'],
        "button functions":[restart,restart,restart],
        text:'You defeated the dragon and won the game!'
    },
    {
        name:'easteregg',
        "button text":['Go to town square','Go to the store','Go to the cave'],
        "button functions":[pickTwo,pickEight,goTown],
        text:'You found an easter egg! You win 100 gold and 50 xp!'
    }
];



btn1.onclick = gostore;
btn2.onclick = gocave;
btn3.onclick = fightDragon;


function update(location){
    monsterStats.style.display = 'none';
    btn1.innerText = location["button text"][0];
    btn2.innerText = location["button text"][1];  
    btn3.innerText = location["button text"][2];
    btn1.onclick = location["button functions"][0];
    btn2.onclick = location["button functions"][1];
    btn3.onclick = location["button functions"][2];
    text.innerText = location.text;
}



function goTown(){
    update(locations[0]);
}

function gostore(){
   update(locations[1]);
    

}

function gocave(){
    update(locations[2]);
}



function buyHealth(){
   if(gold>=10){
    gold-=10;
    health+=10;
    goldText.innerText = gold;
    healthText.innerText = health;
   }else{
    text.innerText = "You don't have enough gold to buy health.";   
   }
}
function buyWeapon(){
    if(currentWeapon<weapons.length-1){
        if(gold>=30){
            gold-=30;   
            currentWeapon++;    
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a new weapon" + newWeapon+'.';
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }else{
            text.innerText = "You don't have enough gold to buy a weapon.";
        }
    }else{
        text.innerText = "You already have the most powerful weapon!";
        btn2.innerText = "Sell weapon for 15 gold";
        btn2.onclick = sellWeapon;
    }

}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        goldTExt.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold your " + currentWeapon + ". In your inventory you have: " + inventory;
        text.innerText += " You now have a " + inventory + ".";  
    }else{
        text.innerText = "You can't sell your only weapon!";
    }
}



function fightSlime() {fighting =0; goFight()}
function fightBeast() {fighting =1; goFight()}
function fightDragon() {fighting =2; goFight()}


function goFight(monster){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The" + monsters[fighting].name + "attacks . ";
    text.innerText += "You attack it with your" + weapons[currentWeapon].name + ".";
    
    if(isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += "You missed the attack!";
    
    }
    
    health -= getMonsterAttackValue(monsters[fighting].level);
    
    monsterHealth -= weapons[currentWeapon].power +Math.floor(Math.random()*xp/2);
    
    healthText.innerText = health;
    
    monsterHealthText.innerText = monsterHealth;
    
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
        fighting ===2 ? win(): defeatMonster();
    }

    if(Math.random()<=.1 && inventory.length!==1){
        text.innerText += "Your " + inventory.pop() + " breaks!";
        currentWeapon--;
    }    
}

function getMonsterAttackValue(level){
    
    let attack = level*5 - Math.floor(Math.random()*xp/2);
    
    console.log(attack);
    
    return attack;
}


function isMonsterHit(){
    return Math.random()>0.2 || health<20; ;
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
    // function win(){
    //     text.innerText = "You defeated the " + monsters[fighting].name + "!";
    // }
function defeatMonster(){
    gold+= Math.floor(monsters[fighting].level*6.7);
    xp +=monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}
function restart(){
    xp =0;
    health =100;
    gold=60;
    currentWeapon=0;
    inventory =['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){ pick(2);}
function pickEight(){pick(8);}

function pick(number){
    let numbers =[];
    while(numbers.length<10){
        numbers.push(Math.floor(Math.random()*10)+1);
    }
    text.innerText = "You can pick a number between 1 and 10. If you pick a number in the top " + number + " you win!";

    for(let i=1; i<=10; i++){
        text.innerText += numbers[i]+'\n';

    }

    if(numbers.indexOf(number)!==-1){
        text.innerText += "You win!";
        health -=10;
        healthText.innerText = health;
        if(health<=0){
         lose();   
        }
    }

}
