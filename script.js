let quoteId = 0;
let quotes;

function setQuote(qid){
    quoteId = qid;
    console.log("current quoteId = ",quoteId);
    const quoteWrapper = document.getElementById("quote_wrapper")
    quoteWrapper.innerHTML = quotes[quoteId].content
}

function handleBtnClick(btn){
    qlen = quotes.length
    let nextId,prevId

    if (quoteId == 0){
        // if the current quote is first in the list, prev quote will be the last one in the list, and goes on the loop
        prevId = qlen - 1;
        nextId = quoteId + 1;
        // setQuote(qlen - 1)
    }else{
        // setQuote(quoteId - 1)
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
    const url = "https://api.quotable.io/quotes?tags="+category
    const result = await fetchData(url)
    quotes = result.results
    console.log(quotes)
    setQuote(0)
}

function darkModeToggle(){
    document.body.classList.toggle("dark-mode")    
    const toggler = document.querySelector(".dark-mode-toggler-icon")
    if (toggler.classList.contains("fa-sun")){
        toggler.classList.remove("fa-sun")
        toggler.classList.add("fa-moon")
    }else{
        toggler.classList.remove("fa-moon")
        toggler.classList.add("fa-sun")
    }
}

const selector = document.getElementById("quote_selector")

selector.addEventListener("change",(e)=>{
    // console.log(e.target.value)
    getQuote(e.target.value)
})