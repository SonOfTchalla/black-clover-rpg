// Element selectors
let containerEl = document.getElementById("container");
let showcaseEl = document.getElementById("showcase");
const titleEl = document.getElementById("title");
const subtextEl = document.getElementById("subtext");
const nameEl = document.getElementById("name-btn");
const errorEl = document.getElementById("error");
const submitEl = document.getElementById("submit-btn");
const playBtn = document.getElementById("play-btn");

//Global variables and flags
let name;
let clovers;
let isMuted = true;
let userMana;

let stageFlag = "start";
submitEl.addEventListener("click", submit);

let backBtn;
let continueBtn;
let subtext2El

function submit(){
    renderGame(stageFlag)
}

function renderGame(stage){
    switch(stage){
        case "start": {
            name = nameEl.value;
            if(name != ""){
                titleEl.textContent = "Welcome to Clover Kingdom, \n" + name;
                subtextEl.textContent = "How many clovers does your grimoire have?";
                nameEl.value = "";
                nameEl.placeholder = "Enter clover count..."
                errorEl.textContent = "";
                stageFlag = "cloverCount"
            }else{
                errorEl.textContent = "Please enter a valid name";
            }
            break;
        }
        case "cloverCount": {
            clovers = Number(nameEl.value);
            if(!isNaN(clovers) && clovers >= 3 && clovers <=5){
                errorEl.textContent = ""
                switch(clovers){
                    case 3:{
                        titleEl.textContent = "Congratulations, " + name;
                        subtextEl.textContent = "You have Faith, Hope, Love"
                        containerEl.style.backgroundImage = "url(img/three-leaf-clover.jpg)"

                        break;
                    }
                    case 4:{
                        titleEl.textContent = "Congratulations, " + name;
                        subtextEl.textContent = "You have Faith, Hope, Love and Great Luck!"
                        containerEl.style.backgroundImage = "url(img/four-leaf-clover.jpg)"
                        break;
                    }
                    case 5:{
                        titleEl.textContent = "Oh no, " + name;
                        subtextEl.textContent = "The three leaves of the clover represents faith, hope, and love. Within a fourth leaf dwells good luck. Within a fifth leaf... Resides a demon!!!"
                        containerEl.style.backgroundImage = "url(img/five-leaf-clover.jpg)"
                        break;
                    }
                }
                
                showcaseEl.removeChild(nameEl);
                showcaseEl.removeChild(submitEl);

                showcaseEl.insertAdjacentHTML("beforeend" ,`
                <p id="subtext2">Would you like to continue?</p>
                <div id="choices">
                    <button id="continue-btn" class="btn">Continue</button>
                    <button id="back-btn" class="btn">Back To Home</button>
                </div>
                `)
                stageFlag = "confirm"
                backBtn = document.querySelector("#back-btn");
                backBtn.addEventListener("click", ()=>{
                    reset()
                });
                continueBtn = document.querySelector("#continue-btn");
                continueBtn.addEventListener("click", ()=>{
                    submit()
                })
            }else{
                errorEl.textContent = "Input numbers only in the range 3 to 5.";
            }
            break;
        }
        case "confirm":{
            titleEl.textContent = "Wanna know your mana level?"
            subtext2El = document.querySelector("#subtext2")
            subtextEl.textContent = "Click below to continue..."
            stageFlag = "mana"
            break;
        }
        case "mana":{
           titleEl.textContent = "Your mana level is ";
           userMana = generateMana()
           subtextEl.textContent = userMana 
           subtext2El.textContent = "Would you like to go to the next stage?"
            break;
        }
    }
    
}

playBtn.addEventListener("click", event => {
    const audio = document.querySelector("audio");
    if(isMuted){
        audio.volume = 0.2;
        audio.play();
        isMuted = false;
        playBtn.textContent = "🕪"
    }else{
        audio.volume = 0;
        isMuted = true;
        playBtn.textContent = "🕨"
    }
})

function reset(){
    titleEl.textContent = "Welcome to the Clover Kingdom";
    subtextEl.textContent = "What is your name?";
    showcaseEl.replaceChildren()
    showcaseEl.appendChild(playBtn)
    showcaseEl.append(titleEl)
    showcaseEl.append(subtextEl)
    showcaseEl.appendChild(nameEl)
    showcaseEl.appendChild(submitEl)
    nameEl.value = ""
    stageFlag = "start";
    console.log(titleEl)
}

function generateMana(){
    if(clovers != 5){
    return Math.floor(Math.random() * 9001);
    }else{
        return 0
    }
}