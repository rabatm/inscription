(function($){
let days= [
    "Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"
]
let times= [
    "9h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"
]
let TDs =[
    "TD DROIT CIVIL- Les personnes et la famille",
    "TD DROIT CONSTITUTIONNEL Vème REPUBLIQUE",
    "TD HISTOIRE DES INSTITUTIONS",
    "TD DROIT CIVIL- Les personnes et la famille",
    "TD DROIT CONSTITUTIONNEL Vème REPUBLIQUE",
    "TD HISTOIRE DES INSTITUTIONS"
]

let templateHoraire = `
<div class="horaire" id="horaire">
<div class="day"><div></div><h3>horaireValue</h3></div>
daysValue
</div>
`
let currentTD=0;
let planning=[];
let endForm=true;
let noTD =0;

function setNextTD() {
    $('#savPlanning').prop("disabled", true);

    let idInArray =$.inArray('null',planning)
    if (idInArray==-1){
        if (planning.length != TDs.length){
        do {
        currentTD=currentTD+1        
        console.log(planning[currentTD])
        }
        while (planning[currentTD]!=undefined)

        $("#" + currentTD).addClass( "is-warning" )

        }       
        else {
            $('#savPlanning').removeAttr("disabled")
            endForm=false
        }
    }
    else 
    {
        currentTD=idInArray
        $("#" + currentTD).addClass( "is-warning" );
    }
}

function updateTD(id) {

    let idInArray =$.inArray(id,planning)
    $("#" + currentTD).removeClass("is-warning")
    if (idInArray===-1)
    {
        if(endForm)
        {
            planning[currentTD]=id
            $("#"+id).html(`<i class="fa-solid fa-circle-minus"> </i>&nbsp;<p>`+ TDs[currentTD].slice(0, 12)+ `</p>` + ``)
            $("#"+id).addClass("is-success")
            $("#" + currentTD).addClass("is-success")
            setNextTD();
        }
    }
    else {
        planning[idInArray]='null'
        $("#"+ currentTD).addClass("is-info")
        $("#"+idInArray).removeClass("is-success")
        $("#"+ idInArray).addClass("is-info")
        
        setNextTD();
        
        $("#"+id).html(`<i class="fa-solid fa-circle-plus"></i>`)
        $("#"+id).removeClass("is-success is-light")
        $("#" + currentTD).removeClass( "is-warning" );
        $("#" + currentTD).removeClass( "is-light" );
        $("#"+ currentTD).addClass("is-warning is-rounded")

        $('#savPlanning').prop("disabled", true);
        endForm=true 
    }
}


$('#jourSemaine').append(`<div class="day"><h3></h3></div>`)
$('#jourSemaineSmall').append(`<div class="day"><h3></h3></div>`)

let flagIsNotUpdateDay=true

$.map(times, (horaire,ihoraire) => {
    let divHoraire = templateHoraire.replace("horaireValue",horaire)
    let dayHTML = ''

    $.map(days, (day,iday) =>{
        if (flagIsNotUpdateDay){
            $('#jourSemaine').append(`<div class="day"><h3>${day}</h3></div>`)
            $('#jourSemaineSmall').append(`<div class="day"><h3>${day.slice(0,1)}</h3></div>`)
        }
            let ihtml='D'+ ihoraire.toString()+ 'T' + (iday.toString())
            dayHTML+=`<div class="date" ><button class="btnDate" id="${ihtml}"><i class="fa-solid fa-circle-plus"></i></button></div>`
    })
    divHoraire=divHoraire.replace("daysValue",dayHTML)
    flagIsNotUpdateDay=false
    $('#horaires').append(divHoraire)
})
$.map(TDs, (td,iTd) => {
    $('#divTab').append(
    `<button id='${iTd}' class="TD">${iTd} - ${td}</button>`)
})

$("#" + currentTD).addClass("is-warning")

$(".TD").addClass( "button is-info is-rounded" );

$('#noTD').click(function() {
if(endForm) {
    $('#divNotGoingList').append(
        `<button id='NOTD${currentTD}' class="noBtnTD button is-success"></button>`)
    
    $('#'+currentTD+'noTD').addClass( "button" ).addClass( "" );
    $('#noTDLabel').prop("hidden", false);
    updateTD("NOTD"+currentTD)
    noTD++
    console.log(noTD)
    
    
    $('.noBtnTD').click(function() {
        noTD--
        if (noTD==0) {$('#noTDLabel').prop("hidden", true);
        }
        updateTD(this.id)
        $( '#' + this.id).remove();
    })
}
});



$(".btnDate").addClass( "button" );

$( ".btnDate" ).click(function() {
    updateTD(this.id)
})



})(jQuery);