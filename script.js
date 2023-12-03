// show category data
fetch("https://openapi.programming-hero.com/api/videos/categories")
.then(res=>res.json())
.then(data=>{
    // for first time home page load
    const categoryData=data.data;
    showCategory(categoryData)
    const flag=0;
    if(flag==0){
        categoryData.forEach(category=>{
            if(category?.category==="All"){
                loadVideo(category.category_id)
            }
        })
        flag=1;
    }
})


const showCategory=(data)=>{
    const btnContainer=document.getElementById("btn-container");
    data.forEach(category=>{
        const spans= document.createElement("span");
        spans.innerHTML=`
        <button onclick="loadVideo(${category.category_id})" class="custom-btn px-3 py-1 me-2">${category?.category}</button>
        `
        btnContainer.appendChild(spans)
    })
    //  console.log(data)
}

let videosData=[]




const loadVideo=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        // videosData=[...data.data];
        videosData=data.data;
        displayVideo();
    });
    console.log(id);
    
}

// display video 
const displayVideo=()=>{
    const cardContainer=document.getElementById("card-containers");
    cardContainer.innerHTML="";
    // for noe found
    const notFound=document.getElementById("not-found");
    if(videosData.length>0){
     videosData.forEach(video=>{
        // millisecond to minute and second convert
        const sec=video?.others?.posted_date;
        const hour=Math.floor(parseInt(sec)/(60*60));
        const minute=Math.floor((parseInt(sec)%(60*60))/60);
        const day=Math.floor(hour/24);
        const card=document.createElement("div");
        card.classList.add("col");

        card.innerHTML=`
        <div class="card border-0">
        <img src=${video?.thumbnail} class="card-img-top" style="height: 180px;" alt="video">
        <span class="bg-black text-white w-50 text-center ms-auto me-2 rounded-2 video-time"><small>${hour?hour:0} hrs ${minute?minute:1} min ago</small></span>
        <div class="mt-3 me-2">
            <div class="d-flex">
            <img src=${video?.authors[0]?.profile_picture} class="rounded-circle me-2" style="width: 40px;height: 40px;" alt="Author img">
            <div>
                <h5 class="card-title">${video?.title}</h5>
                <div class="d-flex align-items-center">
                <p class="me-2 mt-3 text-body-secondary">${video?.authors[0]?.profile_name}</p>
                ${video.authors[0].verified?`<img src="./images/Group 3.png" alt=""></img>`:""}
                </div>
                <p class="text-body-secondary">${video?.others?.views}</p>
            </div>
            </div>
        </div>
        </div>
        `
        cardContainer.appendChild(card)
        notFound.classList.add("d-none");
     })
     console.log(videosData)
    }else{
        notFound.classList.remove("d-none");
    }
}


// sort by views
const sort_by_views=()=>{
    videosData.sort(function(x, y){
        const a=parseInt(x.others.views.split("k")[0]);
        const b=parseInt(y.others.views.split("k")[0]);
        console.log(a,b);
        return b-a;
    })
    displayVideo();
}
const sort_by_view_btn=document.getElementById("sort-by-views");
sort_by_view_btn.addEventListener('click',sort_by_views);

