
let fetchTools = []
const handleCatagory = async (allData) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json()
   
     const tab = document.getElementById('tab')
  
     data.data.forEach(item => {
        const div = document.createElement('div')
        div.innerHTML =` <a onclick = "handleLoad('${item.category_id}')" class="tab bg-gray-300 hover:bg-red-600 
         hover:text-white rounded-md">${item.category}</a> ` 
        tab.appendChild(div) 
 });

}

const handleLoad = async (category_id) => {
     let allData
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const data = await response.json()
    
    const card= document.getElementById('card-container')
    card.innerHTML = " "

    const showContainer = document.getElementById('drowing')
    if(data.data.length === 0) {
     showContainer.classList.remove("hidden")
    }
    else{
        showContainer.classList.add('hidden')
    }

    fetchTools = allData
    handleCatagory(allData)
 
    data.data.forEach((items) => {
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

const sortView =()=>{
    const sortedData = fetchTools.sort((a,b) =>{
        const viewA = parseInt(a.others.views.slice(0, -1) * 1000)
        const viewB = parseInt(a.others.views.slice(0, -1) * 1000)

        return viewA - viewB
       
    })
handleCatagory(sortedData)
console.log(viewA) 
}


handleLoad("1000")
handleCatagory()

const result = document.getElementById("btn")
result.addEventListener("click",function(){
    window.location.href = "answer.html"
})

