let quoteId = 0;
let quotes;

function setQuote(qid){
    quoteId = qid;
    console.log("current quoteId = ",quoteId);
    const quoteWrapper = document.querySelector(".quote_center")
    quoteWrapper.innerHTML = `${quoteId + 1}. ${quotes[quoteId].content} <div class="side">-${quotes[quoteId].author}</div>`
}

function isDarkMode(){
    return document.body.classList.contains("dark-mode")
}

function handleBtnClick(btn){
    qlen = quotes.length
    let nextId,prevId

    if (quoteId == 0){
        // if the current quote is first in the list, prev quote will be the last one in the list, and goes on the loop
        prevId = qlen - 1;
        nextId = quoteId + 1;
    }else{
        prevId = quoteId - 1;
        nextId = (quoteId + 1) % qlen;
    }
    if (btn == "prev"){
        setQuote(prevId)
    }else if(btn == "random"){
        setQuote(Math.floor(Math.random() * 1000) % qlen)

    }else{
        // btn = next;
        setQuote(nextId);
    }
}

async function fetchData(url){
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        });
    })  
}

async function getQuote(category){
    // fetch the quote associated with category and show loader until the data arrives
    const url = "https://api.quotable.io/quotes?tags="+category
    const loaderSrc = isDarkMode() ?  "darkLoader.gif" : "loader.gif";
    document.querySelector(".quote_center").innerHTML = `<img src='assets/${loaderSrc}' alt='loader'>`;
    const result = await fetchData(url)
    quotes = result.results
    console.log(quotes)
    setQuote(0)
}

function darkModeToggle(){
    document.body.classList.toggle("dark-mode")    
    const toggler = document.querySelector(".dark-mode-toggler-icon")
    if (isDarkMode()){
        // just toggled dark-mode ? isDarkMode() returns true : false
        toggler.classList.remove("fa-sun")
        toggler.classList.add("fa-moon")
    }else{
        toggler.classList.remove("fa-moon")
        toggler.classList.add("fa-sun")
    }
}


const selector = document.getElementById("quote_selector")

selector.addEventListener("change",(e)=>{
    getQuote(e.target.value)
})

const fontSize = document.getElementById("fontSize")
fontSize.addEventListener("input",(e)=>{
    const min = 10,max=30;
    const newFontSize = min + fontSize.value/ 100* (max-min); 
    document.getElementById("quote_wrapper").style.fontSize = Math.floor(newFontSize)+"px"
    document.getElementById("fontSizeDisplay").innerHTML = Math.floor(newFontSize)+"px"
})