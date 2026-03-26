//galeria de imagens dinamicas -> DOM

//pegando elementos do HTML
let uploadInput = document.querySelector("#upload");
let btnAdd = document.querySelector("#addImage");
let galeria = document.querySelector(".galeria");
let carrossel = document.querySelector(".carrossel");

//vetor das imagnes
let imagens = [];

btnAdd.addEventListener("click",()=>{
    let imageURL = uploadInput.value.trim(); //trim remove espaços antes e depois do texto
    if(imageURL==="")return;//se imagem vazia interrempe o método
    //continuo
    imagens.push(imageURL);//adicionando o link ao vetor de imagens
    atualizarGaleria();//recarrega a galeria
    atualizarCarrossel();//recarrega o carrossel
    uploadInput.value = "";//limpa o input

});

//atualizar Galeria
function atualizarGaleria(){
    galeria.innerHTML=""; //limpando a galeria 
    // //percorrer o vetor imagem
    imagens.forEach(
        (imagem,index)=>{
            let div = document.createElement("div");
            div.classList.add("imagemContainer");
            let img = document.createElement("img");
            img.src = imagem;
            let btnRemove = document.createElement("button");
            btnRemove.innerText = "X";
            btnRemove.classList.add("remove");
            btnRemove.addEventListener("click",()=>{
                imagens.splice(index,1);
                atualizarGaleria();//recursão
            });
            div.appendChild(img);
            div.appendChild(btnRemove);
            galeria.appendChild(div);
        }
    )
}

function atualizarCarrossel(){
    carrossel.innerHTML = ""; //limpa o carrossel
    imagens.forEach(imagem =>{
        let img = document.createElement("img");
        img.src = imagem;
        img.style.width = "100%";
        carrossel.appendChild(img);
    });
    carrossel.style.width = `${imagens.length*100}%`
    inicialCarrossel();
}

//iniciar o carrossel
function inicialCarrossel(){
    let index = 0;
    setInterval(()=>{
        index = (index+1)%imagens.length;
        carrossel.style.transition = `transform ${(1+imagens.length)/imagens.length}s ease-in-out`;
        carrossel.style.transform = `translateX(-${index*100/imagens.length}%)`;
    },2000);
}
