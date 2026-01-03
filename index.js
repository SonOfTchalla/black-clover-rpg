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
let userMagicType;
let stageFlag = "start";
let backBtn;
let continueBtn;
let subtext2El;
const blackCloverMagicTypes = [
    // 🌿 Natural / Elemental Magic
    "Fire Magic",
    "Water Magic",
    "Wind Magic",
    "Earth Magic",
    "Lightning Magic",
    "Ice Magic",
    "Snow Magic",
    "Sand Magic",
    "Ash Magic",
    "Smoke Magic",
    "Mercury Magic",
    "Steel Magic",
    "Bronze Magic",
    "Copper Magic",
    "Iron Magic",
    "Crystal Magic",
    "Glass Magic",
    "Rock Magic",
    "Mineral Magic",
    "Plant Magic",
    "Tree Magic",
    "Cotton Magic",
    "Mushroom Magic",
  
    // 🩸 Body / Physical-Based Magic
    "Blood Magic",
    "Bone Magic",
    "Flesh Magic",
    "Hair Magic",
    "Skin Magic",
    "Muscle Magic",
    "Nail Magic",
    "Eye Magic",
    "Tongue Magic",
  
    // 🧠 Mental / Sensory Magic
    "Memory Magic",
    "Dream Magic",
    "Illusion Magic",
    "Hypnosis Magic",
    "Permeation Magic",
    "Stealth Magic",
  
    // ⏳ Space / Time / Gravity Magic
    "Spatial Magic",
    "Time Magic",
    "Gravity Magic",
    "Portal Magic",
    "Warp Magic",
  
    // 🧬 Abstract / Conceptual Magic
    "Curse Magic",
    "Curse-Warding Magic",
    "Sealing Magic",
    "Restriction Magic",
    "Word Soul Magic",
    "Contract Magic",
  
    // 🧿 Attribute / Status Magic
    "Anti-Magic",
    "Trap Magic",
    "Poison Magic",
    "Venom Magic",
    "Decay Magic",
    "Rot Magic",
    "Sludge Magic",
    "Sticky Magic",
    "Paint Magic",
    "Paper Magic",
    "Dice Magic",
  
    // 🧙 Support / Utility Magic
    "Healing Magic",
    "Creation Magic",
    "Recombination Magic",
    "Reinforcement Magic",
    "Transformation Magic",
    "Copy Magic",
    "Imitation Magic",
    "Thread Magic",
    "Compass Magic",
    "Tool Magic",
  
    // 🐉 Spirit / Mythical Magic
    "Spirit Magic",
    "Fire Spirit Magic",
    "Wind Spirit Magic",
    "Water Spirit Magic",
    "Earth Spirit Magic",
    "Beast Magic",
    "Dragon Magic",
  
    // 😈 Devil / Forbidden Magic
    "Devil Magic",
    "Devil Fire Magic",
    "Devil Ice Magic",
    "Devil Gravity Magic",
    "Devil Time Magic",
    "Devil Curse Magic",
    "Supreme Devil Magic",
  
    // 👑 Royal / Rare Magic
    "Star Magic",
    "Sun Magic",
    "Moon Magic",
    "Light Magic",
    "Dark Magic",
    "World Tree Magic",
  
    // ⚔️ Weapon-Based Magic
    "Sword Magic",
    "Blade Magic",
    "Bow Magic",
    "Spear Magic",
    "Chain Magic",
  
    // 🧪 Miscellaneous Magic
    "Sound Magic",
    "Music Magic",
    "Food Magic",
    "Game Magic",
    "Festival Magic"
  ];
  

//Event listeners
submitEl.addEventListener("click", submit);

//Runs when submit button is clicked
function submit(){
    renderGame(stageFlag)
}

//Renders game screen based on stage flag
function renderGame(stage){
    switch(stage){
        //runs during stage stage
        case "start": {
            name = nameEl.value;
            if(name != ""){
                localStorage.setItem("userName", name);
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
        //runs during clover number screen
        case "cloverCount": {
            clovers = Number(nameEl.value);
            if(!isNaN(clovers) && clovers >= 3 && clovers <=5){
                errorEl.textContent = ""
                localStorage.setItem("clovers", clovers);
                switch(clovers){
                    case 3:{
                        populateScreen(stage, "Congratulations, " + name, "You have Faith, Hope, Love", "", "url(img/three-leaf-clover.jpg)");
                        break;
                    }
                    case 4:{
                        populateScreen(stage, "Congratulations, " + name,
                        "You have Faith, Hope, Love and Great Luck!", "",
                        "url(img/four-leaf-clover.jpg)");
                        break;
                    }
                    case 5:{
                        populateScreen(stage, "Oh no, " + name,
                        "The three leaves of the clover represents faith, hope, and love. Within a fourth leaf dwells good luck. Within a fifth leaf... Resides a demon!!!", "", "url(img/five-leaf-clover.jpg)");
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
        //Runs if user confirms they want to continue
        case "confirm":{
            subtext2El = document.querySelector("#subtext2")
            populateScreen(stageFlag, "Wanna know your mana level?", "", "Click below to continue...", "")
            stageFlag = "mana"
            break;
        }
        //runs when user request to know their mana level
        case "mana":{
           getManaAndType()
           localStorage.setItem("mana",userMana);
           localStorage.setItem("magic", userMagicType);
           populateScreen(stageFlag, "Your mana level is \r\n" + userMana, "Your magic type is \r\n" + userMagicType, "Would you like to go to the next stage?", "")
           stageFlag = "MagicKnight"
            break;
        }
        case "MagicKnight":{

        }
    }
    
}

//play button event listeners
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

//Resets to home screen
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

//Generate mana level and magic type for user
function getManaAndType(){
    if(clovers != 5){
        userMana = Math.floor(Math.random() * 9001);
        userMagicType = blackCloverMagicTypes[Math.floor(Math.random() * blackCloverMagicTypes.length)];
    }else{
        userMana = 0;
        userMagicType = "Unknown.";
    }
}
// Populate the screen text
function populateScreen(stageFlag, title, subtext, subtext2, containerBG){
    titleEl.textContent = title;
    subtextEl.textContent = subtext
    switch(stageFlag){
        case "cloverCount":{
            containerEl.style.backgroundImage = containerBG
            break;
        }
        case "confirm":
        case "mana":{
            subtext2El.textContent = subtext2
            break;
        }
       
    }
}