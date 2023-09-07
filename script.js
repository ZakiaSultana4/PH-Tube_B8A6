
let currentData;
const handleCatagory = async (allData) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json()
   
     const tab = document.getElementById('tab')
  
     data.data.forEach(item => {
        const div = document.createElement('div')
        div.innerHTML =` <a onclick = "clickDataGet('${item.category_id}')" class="tab bg-gray-300 hover:bg-red-600 
         hover:text-white rounded-md">${item.category}</a> ` 
        tab.appendChild(div) 
 });

}

const clickDataGet = async(categoryId)=>{
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json() 
    const allData =data.data
    currentData = allData
    handleLoad(allData)
}

    const sortView= ()=>{
        const shortedData = currentData.sort((a,b) =>{
            const viewA = parseInt(a.others.views.slice(0, -1) * 1000)
            const viewB = parseInt(b.others.views.slice(0, -1) * 1000)
    
            return viewB - viewA
           
        })
    handleLoad(shortedData)
    
    }
    
    const handleLoad = (allData)=>{
    const card= document.getElementById('card-container')
    card.innerHTML = " "
    const showContainer = document.getElementById('drowing')
    if(allData.length === 0) {
     showContainer.classList.remove("hidden")
    }
    else{
        showContainer.classList.add('hidden')
    }

    allData.forEach((items) => {
        console.log(allData)
        const time = parseInt(items.others.posted_date)
        const hour = Math.floor(time/3600)
        const rest1 = time - (hour*3600)
        const  minute = Math.floor( (rest1/60))
        const sec = rest1 - (minute*60)
        const final= `${hour} hour ${minute} minutes ${sec} second ago`

        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-[300px] h-[400px] shadow-lg">
        <figure class="px-10 pt-10  relative">
          <img src=${items.thumbnail} class="rounded-xl mt-5" />
          <div class = " text-white  text-[10px] px-2 py-1 absolute ${!isNaN(time) ? 'bg-slate-950' : " "}
           right-0 bottom-0 mr-10 rounded-l-md">
          ${!isNaN(time)?  final  : "   "}
          </div>
        </figure>
      
        <div class="flex mt-5 ml-8 gap-3 mb-3">
          <img src=${items?.authors[0]?.profile_picture } class="rounded-full w-12 h-12" />
         <p class = "font-bold mt-3">${items.title}</p>
        </div> 
           
         <div class = "ml-10 mb-10"> 
             <div class = "flex gap-2">
             <p> ${items?.authors[0]?.profile_name}</p>
             <P>${items.authors[0].verified ?  "<img src ='bage.svg'></img>"  : " "}</p>
             </div>
              <p class = " ">${items.others.views} views</p>
        </div>  
              </div>
       `
    card.appendChild(div)
 })
}

 clickDataGet('1000')
handleCatagory()

const result = document.getElementById("btn")
result.addEventListener("click",function(){
    window.location.href = "answer.html"
})
