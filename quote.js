var play;
function generate(){
    var quotes={
        " – Donatella Versace" : '"Wear a fabulous smile, great jewelry and know that you are totally and utterly in control. "',
        " – Iris Apfel":'"Transformation, punch, individuality: One or all of the above are why you should wear jewelry."',
        " ― Elizabeth Taylor": '"Big girls need big diamonds."',
        " – Jada Pinkett Smith": '"If I had my way, I’d wear jewelry, a great pair of heels and nothing else."',
        " -Great Minds":'"An outfit without jewelry is like a cupcake without frosting. "',
        " – Madison Gem":'"Your jewelry introduces you before you speak"',
        " – Kate Moss":'"Jewelry is eternal, it never goes out of fashion it will always be there"',
        " - Elizabeth Taylor.":'"You can’t cry on a diamond’s shoulder, and diamonds won’t keep you warm at night, but they’re sure fun when the sun shines."',
        ' - Garden of the Sun':'"You cant buy happinesss,but you can buy jewelry and that\'s kind of the same"'
    }
    var authors=Object.keys(quotes)
    var author=authors[Math.floor(Math.random()*authors.length)];
    console.log(author)
    var quote= quotes[author];
    console.log('good')

    document.querySelector('.quote').innerHTML=quote;
    document.querySelector('.author').innerHTML=author;
    clearInterval(play)
    play=setInterval("generate()",7000)
    
}
generate()

const header=document.querySelector(".nav");

window.addEventListener("scroll", function () {
    var top=window.scrollY;
    console.log(top)
    if(top>=5){
        header.classList.add('active')
    }else{
        header.classList.remove('active')
    }
}, false);
