let save=document.querySelector(".save");
let open=document.querySelector(".open");


save.addEventListener("click",function(){

    const data=JSON.stringify(sheetDb);

    const blob=new Blob([data],{type:'application/json'});

    const url=window.URL.createObjectURL(blob);

    let a=document.createElement('a');
    a.download="file.json";
    a.href=url;
    a.click();
})

open.addEventListener("change",function(){

    let filesArray=open.files;
    let fileObj=filesArray[0];

    let fr=new FileReader(fileObj);fr.readAsText(fileObj);
    fr.onload=function(){
        console.log(fr.result);
    }
})