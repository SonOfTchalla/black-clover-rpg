let containerEl = document.getElementById("container");
let showcaseEl = document.getElementById("showcase");
const titleEl = document.getElementById("title");
const subtextEl = document.getElementById("subtext");
const nameEl = document.getElementById("name-btn");
const errorEl = document.getElementById("error");
const submitEl = document.getElementById("submit-btn");

//Global variables
let name;
let clovers;

let welcome;
let stageFlag = "saveName";
submitEl.addEventListener("click", submit);

function submit(){
    functionality(stageFlag)
}

function functionality(type){
    switch(type){
        case "saveName": {
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
            }else{
                errorEl.textContent = "Input numbers only in the range 3 to 5.";
            }
            break;
        }
    }
    
}