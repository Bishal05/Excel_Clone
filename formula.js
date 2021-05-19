for(let i=0;i<allCells.length;i++)
{
    allCells[i].addEventListener("blur",function(){
        let data=allCells[i].innerText;
        let address=addressInput.value;
        // let {rid,cid}=getRIDCIDFromAdress(address);
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        let cellObj=sheetDb[rid][cid];
        
        if(cellObj.value==data){
            return;
        }

        if(cellObj.formula){
            removeFormula(cellObj,address);
            formulaBar.value="";
        }
        cellObj.value=data;
        updateChildren(cellObj);
    })
}

formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formulaBar.value){
        let currentFormula=formulaBar.value;
        let address=addressInput.value;

        let {rid,cid}=getRIDCIDFromAdress(address);
        let cellObj=sheetDb[rid][cid];

        if(currentFormula!=cellObj.formula){
            removeFormula(cellObj,address);
        }


        let value=evaluateFormula(currentFormula);

        setCell(value,currentFormula);
        setParentChildArray(currentFormula,address);
    }
})

function evaluateFormula(formula){
    let formulaTokens=formula.split(" "); 
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let {rid,cid}=getRIDCIDFromAdress(formulaTokens[i]);
            let value=sheetDb[rid][cid].value;
            formulaTokens[i]=value;
        }
    }
    
    let evaluatedFormula=formulaTokens.join(" ");
    console.log(evaluatedFormula);
    
    return eval(evaluatedFormula);
}

function setCell(value,formula){
    let uiCellElement=findUICellElement();
    uiCellElement.innerText=value;

    let {rid,cid}=getRIDCIDFromAdress(addressInput.value);
    sheetDb[rid][cid].value=value;
    sheetDb[rid][cid].formula=formula;
}


function getRIDCIDFromAdress(address){
    let cid=Number(address.charCodeAt(0))-65;
    let rid=Number(address.slice(1))-1;
    return{
        "rid":rid,
        "cid":cid
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

function setParentChildArray(currentFormula,address){
    let formulaTokens=currentFormula.split(" "); 
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let {rid,cid}=getRIDCIDFromAdress(formulaTokens[i]);
            let parentObj=sheetDb[rid][cid];
            parentObj.children.push(address);
        }
    }
}

function updateChildren(cellObj){
    let children=cellObj.children;

    for(let i=0;i<children.length;i++){
        let childrenAdress=children[i];

        let {rid,cid}=getRIDCIDFromAdress(childrenAdress);

        let childObj=sheetDb[rid][cid];

        let childFormula=childObj.formula;
        let childValue=evaluateFormula(childFormula);
        setChildrenCell(childValue,childFormula,rid,cid);
        updateChildren(childObj);
    }
}

function setChildrenCell(value, formula, rid, cid){
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText = value;
    sheetDb[rid][cid].value = value;
    sheetDb[rid][cid].formula = formula;
}

function removeFormula(cellObj,myName){
    let formula=cellObj.formula;

    let formulaTokens=formula.split(" ");

    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let {rid,cid}=getRIDCIDFromAdress(formulaTokens[i]);
            let parentObj=sheetDb[rid][cid];
            let idx=parentObj.children.indexOf(myName);
            parentObj.children.splice(idx,1);
        }
    }
    cellObj.formula="";
}