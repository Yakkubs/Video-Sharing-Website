var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
async function fetchWithString(){
    try{
        var response = await fetch(url);
        var data = await response.json();
        var count = 0;
        var imageCount = document.getElementById('count');
        console.log(imageCount);
        var htmlString = data.reduce( function (prev, product){
            count++;
            return (prev + `<div class = "product-card">
            <img class= "product-img" src ="${product.thumbnailUrl}">
            <div class = "product-info">
                <p class = "product-title">${product.title}</p>
            </div>
        </div>`);
        },"");
        imageCount.textContent = "Current Image Count: "+ count;
        document.getElementById('product-list').innerHTML = htmlString;
        let items = document.getElementsByClassName('product-card');
        [...items].forEach(function(ele){
            ele.addEventListener('click',function(ev){
                var current = ev.currentTarget;
                current.style.transition = 'opacity 0.5s';
                current.style.opacity = 0;
                let timer = setInterval(function(){
                    current.remove();
                    clearInterval(timer);
                    count--;
                    imageCount.textContent = "Current Image Count: "+ count;
                },500);
            })
        });
    }catch(error){
        console.log(error);
    }
}
fetchWithString();
