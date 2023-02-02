let apiKey = 'b99c6f083a7999528a08501328fd09cc';
let newsAccordion = document.getElementById('newsAccordion');


let input = document.getElementById("input");
// Creating an AJAX get request

const xhr = new XMLHttpRequest();
if(input.value == 'index'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`, true);
}
else if(input.value == 'sports'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=sports&token=${apiKey}`, true);
}
else if(input.value == 'buisness'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=buisness&token=${apiKey}`, true);
}
else if(input.value == 'health'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&topic=health&lang=en&token=${apiKey}`, true);
}
else if(input.value == 'entertainment'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&topic=entertainment&lang=en&token=${apiKey}`, true);
}
else if(input.value == 'science'){
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&topic=science&lang=en&token=${apiKey}`, true);
}
else{
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&topic=technology&lang=en&token=${apiKey}`, true);
}

// What to do on process
xhr.onprogress = function(){
    newsAccordion.innerHTML = `<div class="spinner-border text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                               </div>`;
}

// What to do when response is ready
xhr.onload = function () {
    if(this.status === 200){
        console.log(JSON.parse(this.response));
        let json = JSON.parse(this.responseText);
        let articles = json.articles;   
        let newsHtml = "";
        let i = 0;
        for (news in articles){
            console.log(articles[news].source.name);
            newsHtml += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading${i}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                            ${articles[news].title}
                        </button>
                    </h2>
                    <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">${articles[news].description} <a target="_blank" href=${articles[news].url}>Read more here.</a></div>
                    </div>
                </div>`;
            i++;
        }
        newsAccordion.innerHTML = newsHtml;
    }
    else{
        console.log("Some error occured");
    }
}

// sending the request
xhr.send();

