//define elements
const toneSelect = document.getElementById("tone-select");
const articleLength = document.getElementById("length-slider");
const lengthText = document.getElementById("length-value");
const basePrompt = document.getElementById("base-prompt");
const promptPreview = document.getElementById("promptpreviewtext");
const costEstimate = document.getElementById("estimatedcost");
const userTopic = document.getElementById("topic-input");

//set the initial prompt preview value
updatePrompt();

//add event listener to the article length slider
articleLength.addEventListener("input", updatePrompt);

//add event listener to the tone select
toneSelect.addEventListener("change", updatePrompt);

//add event listener to the base prompt
basePrompt.addEventListener("input", updatePrompt);

//add event listener to the topic input
userTopic.addEventListener("input", updatePrompt);

//update cost estimate function
function updateCost() {
  lengthText.innerHTML = articleLength.value + " words";
  let tokensUsed = articleLength.value * 0.75;
  let tokenCost = 0.02 / 1000;
  let totalCost = tokensUsed * tokenCost;
  costEstimate.innerHTML = "Estimated Cost: $" + totalCost.toFixed(2);
}

//update prompt function
function updatePrompt() {
  promptpreviewtext.innerHTML =
    "Write a long, very detailed, highly SEO optimized article about  " +
    userTopic.value +
    ". <br><br> " +
    basePrompt.value +
    "Use a " +
    toneSelect.value +
    " tone. <br><br> Make sure the article is no longer than  " +
    articleLength.value +
    " words.";

  updateCost();
}
