(function($){
let days= [
    "Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"
]
let times= [
"8h00 - 9h30",
"9h30 - 11h00",
"11h00 - 12h30",
"13h00 - 14h00",
"14h30 - 16h00",
"16h00 - 17h30",
"17h30 - 19h00",
"19h00 - 20h30"
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
            if(id[0] != 'p') {
            $("#"+id).html(`<i class="fa-solid fa-circle-minus"> </i>&nbsp;<p><abbr title="${TDs[currentTD]}">`+ TDs[currentTD].slice(0, 12)+ `</p>` + ``)}
            
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
        $("#"+id).removeClass("is-success")
        $("#" + currentTD).removeClass( "is-warning" );
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
            $('#selectDayPerso').append(`<option>${day}</option>`)
        }
            let ihtml=day+"-"+horaire.replace(' ','').replace(' ','')
            dayHTML+=`<div class="date" ><button class="btnDate" id="${ihtml}"><i class="fa-solid fa-circle-plus"></i></button></div>`
    })
    divHoraire=divHoraire.replace("daysValue",dayHTML)
    flagIsNotUpdateDay=false
    $('#horaires').append(divHoraire)
})
$.map(TDs, (td,iTd) => {
    $('#divTab').append(
    `<button id='${iTd}' class="TD">${td}</button>`)
})




$("#" + currentTD).addClass("is-warning")

$(".TD").addClass( "button is-info is-rounded" );


$('#savHorairePerso').click(function() {
    const start = $('#startPerso')[0].value.replace(":","h")
    const end = $('#endPerso')[0].value.replace(":","h")
    const day = $('#selectDayPerso')[0].value
    const idHTML ='p'+day+'-'+start+'-'+end
    if(endForm)
    {
        $('#divHperso').append(`<div class="block is-1" id="${idHTML}">
            <div class="notification is-primary">
            <button class="delete"></button>${day} de ${start}  à ${end} - ${TDs[currentTD]}
            </div>
            </div>`)

        $(`#${idHTML}`).click(function () {
            updateTD(this.id)
            $( '#' + this.id).remove();
        })
            updateTD(idHTML)
            $('#divHperso').prop("hidden", false);
    }
})


$('#noTD').click(function() {

if(endForm) {
    $('#divNotGoingList').append(
        `<button id='NOTD${currentTD}' class="noBtnTD button is-success"></button>`)
    $('#'+currentTD+'noTD').addClass( "button" ).addClass( "" );
    $('#noTDLabel').prop("hidden", false);

    updateTD("NOTD"+currentTD)
    noTD++ 
    
    $('.noBtnTD').click(function() {
        noTD--
        if (noTD==0) {$('#noTDLabel').prop("hidden", true);
        }
        updateTD(this.id)
        $( '#' + this.id).remove();
    })
}
});

$("#savPlanning").click(function () {
   
$.map(TDs, (td,iTd) => {
    let p =[]
    if (planning[iTd]=='NOTD'+iTd){
        p[0]="Non"
        p[1]="Non"
        p[2]="Non"
    }else
    {
    p=planning[iTd].split("-")
    }
    $('#tRecap').append(
    `                    
    <tr>
        <td>${td}</td>
        <td>${p[0].replace("p","")}</td>
        <td>${p[1]}</td>
        <td>${p[2]}</td>
    </tr>`)
})
})


$("#verifOk").change(function (){
    if (this.checked) {
        $('#commitPlanning').prop("disabled", false);
    }
    else
    {
        $('#commitPlanning').prop("disabled", true);
    }
})

$(".btnDate").addClass( "button" );

$( ".btnDate" ).click(function() {
    updateTD(this.id)
})



})(jQuery);