let leftCol=document.querySelector(".left-col");
let topRow=document.querySelector(".top-row");
let grid=document.querySelector(".grid");
let addressInput=document.querySelector(".address-input");
let boldBtn=document.querySelector(".bold");
let underLineBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");
let rows=100;
let cols=26;
let fontSizeElement=document.querySelector(".font-size");
let formulaBar=document.querySelector(".formula-input");

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

// making a 2d array to store the attributes of each cell
let sheetDb=[];

for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
        // information of each cell is stored as object
        let cell={
            bold:"normal",
            italic:"normal",
            underline:"none",
            hAlign:"center",
            fontFamily:"sans-serif",
            fonrSize:"16",
            color:"black",
            bColor:"none",
            formula:"",
            value:"",
            children:[]
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

        // to get the informtion of the cell we clicked
        let cellObject=sheetDb[rid][cid];

        // Now if the text in the cell is not bold when we clicked it then we have to remove the active class. 
        if(cellObject.bold=="normal"){
            boldBtn.classList.remove("active-btn");
        }else{
            // Now if the text in the cell is  bold when we clicked it then we have to add the active class. 
            boldBtn.classList.add("active-btn");
        }

        if(cellObject.italic=="normal"){
            italicBtn.classList.remove("active-btn");
        }else{
            italicBtn.classList.add("active-btn");
        }

        if(cellObject.underline=="none"){
            underLineBtn.classList.remove("active-btn");
        }else{
            underLineBtn.classList.add("active-btn");
        }

        if(cellObject.formula){
            formulaBar.value=cellObject.formula;
        }
        else{
            formulaBar.value="";
        }

    })
}
// when our page load the adress of first cell is alredy written in adress input to do this we are doing this
allCells[0].click();

boldBtn.addEventListener("click",function(){
    
    let uiCellElement=findUICellElement() 
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    // cellObject contains all the attributes of the cell;
    let cellObject=sheetDb[rid][cid];

    // now when we clicked on bold button and the bold attribute in the cellObj is normal then we have to make the text in the cell as bold and add the active class on that cell 
    if(cellObject.bold=="normal"){
        uiCellElement.style.fontWeight="bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold="bold"
    }
    // if it is bold then we do the opposite thing
    else
    {
        uiCellElement.style.fontWeight="normal"
        boldBtn.classList.remove("active-btn");
        cellObject.bold="normal";
    }
})

italicBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDb[rid][cid];

    if(cellObject.italic=="normal")
    {
        uiCellElement.style.fontStyle="italic";
        italicBtn.classList.add("active-btn");
        cellObject.italic="italic"
    }
    else
    {
        uiCellElement.style.fontStyle="normal";
        italicBtn.classList.remove("active-btn");
        cellObject.italic="normal"
    }
})

underLineBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();

    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDb[rid][cid];

    if(cellObject.underline=="none")
    {
        uiCellElement.style.textDecoration="underline";
        underLineBtn.classList.add("active-btn");
        cellObject.underline="underline"
    }
    else
    {
        uiCellElement.style.textDecoration="none";
        underLineBtn.classList.remove("active-btn");
        cellObject.underline="none"
    }
})

fontSizeElement.addEventListener("change",function(){
    let val=fontSizeElement.value;
    let uiCellElement=findUICellElement();
    uiCellElement.style.fontSize=val+"px";
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