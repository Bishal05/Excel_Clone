let leftCol=document.querySelector(".left-col");
let topRow=document.querySelector(".top-row");
let grid=document.querySelector(".grid");
let addressInput=document.querySelector(".address-input");
let boldBtn=document.querySelector(".bold");
let rows=100;
let cols=26;

// we are making the left col here it should have 100 rows from 1 to 100
for(let i=0;i<rows;i++){
    let colBox=document.createElement("div");
    colBox.innerText=i+1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}

// we are making the top row here it should have 26 rows from A to Z
for(let i=0;i<cols;i++)
{
    let cell=document.createElement("div");
    cell.innerText=String.fromCharCode(65+i);
    cell.setAttribute("class","cell");
    topRow.appendChild(cell);
}

// we are making grid
for(let i=0;i<rows;i++)
{
    // We will be making 100 rows and then will be attaching 26 columns to each row
    let row=document.createElement('div');
    row.setAttribute("class","row")
    for(let j=0;j<cols;j++)
    {
        // this loop is for the columns
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        // cell.innerText=`${String.fromCharCode(65+j)} ${i+1}`
        cell.setAttribute("rid",i)
        cell.setAttribute("cid",j)
        // By default we cannot write anything in div but by setting contenteditable true we can write anything inside div
        cell.setAttribute("contenteditable","true");
        // appemding 26 columns to the row one by one
        row.appendChild(cell);
    }
    // appending 100 rows one by one to the grid
    grid.appendChild(row);
}

let sheetDb=[];

for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
        let cell={
            bold:"normal",
            italic:"normal",
            underline:"none",
            hAlign:"center",
            fontFamily:"sans-serif",
            fonrSize:"16",
            color:"black",
            bColor:"none"
        }
        row.push(cell);
    }
    sheetDb.push(row);
}

//TO get the adress of each cell and display it in adress input 
let allCells=document.querySelectorAll(".grid .cell");
for(let i=0;i<allCells.length;i++)
{
    allCells[i].addEventListener("click",function(){
        // got cid and rid from the attributes we set
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        // converted to number
        rid=Number(rid);
        cid=Number(cid);
        // making the aderss of the cell we clicked
        let address=`${String.fromCharCode(65+cid)}${rid+1}`
        // setting adress of our clicked cell in  address input
        addressInput.value=address;

        let cellObject=sheetDb[rid][cid];

        if(cellObject.bold=="normal"){
            boldBtn.classList.remove("active-btn");
        }else{
            boldBtn.classList.add("active-btn");
        }

    })
}
// when our page load the adress of first cell is alredy written in adress input to do this we are doing this
allCells[0].click();

boldBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement() 
    // uiCellElement.style.fontWeight="bold"
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDb[rid][cid];

    if(cellObject.bold=="normal"){
        uiCellElement.style.fontWeight="bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold="bold"
    }
    else
    {
        uiCellElement.style.fontWeight="normal"
        boldBtn.classList.remove("active-btn");
        cellObject.bold="normal";
    }
})

function getRIDCIDFromAdress(address){
    let cid=Number(address.charCodeAt(0))-65;
    let rid=Number(address.slice(1))-1;
    return{
        "cid":cid,
        "rid":rid
    }
}

function findUICellElement() {
    let address = addressInput.value;
    let ricidObj = getRIDCIDFromAdress(address);
    let rid = ricidObj.rid;
    let cid = ricidObj.cid;
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    return uiCellElement;
}