let sheetList=document.querySelector(".sheet-list");
let addBtn=document.querySelector(".add-sheet_btn-container");

let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",makeMeActive)


addBtn.addEventListener("click",function(){
    let allSheet=document.querySelectorAll(".sheet");
    let lastSheet=allSheet[allSheet.length-1];
    // we set idx as attribute to get the idx and increment it and add to next sheet
    // we will get the index of last sheet
    let lastIdx=lastSheet.getAttribute("idx");
    lastIdx=Number(lastIdx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    // setting the index as attribute to the new Sheet
    NewSheet.setAttribute("idx",`${lastIdx+1}`);
    NewSheet.innerText=`Sheet ${lastIdx+2}`;

    // adding the bew Sheet to out sheetList
    sheetList.appendChild(NewSheet);

    // removing the active class from all the sheets
    for(let i=0;i<allSheet.length;i++){
        allSheet[i].classList.remove("active");
    }
    // adding active state to the new formed sheet  
    NewSheet.classList.add("active");

    // we are adding eventListner to each sheet bcause when ever we will click at the sheet it should be active
    NewSheet.addEventListener("click",makeMeActive)
})

function makeMeActive(e){
    let sheet=e.currentTarget;
    let allSheet=document.querySelectorAll(".sheet");

    for(let i=0;i<allSheet.length;i++){
        allSheet[i].classList.remove("active");
    }

    sheet.classList.add("active");
}