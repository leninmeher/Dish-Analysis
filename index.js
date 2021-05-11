$(document).ready(function(){
    $('#search').submit(function(event){
        performSearch(event);
    });
});

function performSearch(event){
    var request;
    event.preventDefault();

    request=$.ajax({
        url:"https://api.spoonacular.com/recipes/guessNutrition",
        type:"GET",
        data:{
            title:$('#dish').val(),
            apiKey:'3cca87d4f79f4a498bf1fc16b920bc3d'
        },
        // success: function(data){
        //     formatSearch(data);
        // },
        // error: function(data){
        //     //get the status code
        //     if (code == 400) {
        //         alert('400 status code! user error');
        //     }
        //     if (code == 500) {
        //         alert('500 status code! server error');
        //     }
        // }
        
    });

    request.done(function(response){
        if(response.status==='error'){
            $('#error').text("No such dish found")

            $('#energy').text("")
            $('#protein').text("")
            $('#fats').text("")
            $('#carbs').text("")

            $('#eMax').text("")
            $('#pMax').text("")
            $('#fMax').text("")
            $('#cMax').text("")

            $('#report-p').text("")

            $('.card').css('background-color','white')

        }else{
            $('#error').text("")
            formatSearch(response)
        }
        
    })

    // request.fail(function() {
    //     alert( "error" );
    //   })

    

}


function formatSearch(jsonObject){

    var title=$('#dish').val()

    $('#report-p').text("Nutrients in "+title);

    $('.card').css('background-color','#5cb85c')
    var energy=jsonObject.calories.value
    var fat=jsonObject.fat.value
    var carbs=jsonObject.carbs.value
    var protein=jsonObject.protein.value

    var energyMax=jsonObject.calories.confidenceRange95Percent.max
    var fatMax=jsonObject.fat.confidenceRange95Percent.max
    var carbsMax=jsonObject.carbs.confidenceRange95Percent.max
    var proteinMax=jsonObject.protein.confidenceRange95Percent.max

    var energyUnit=jsonObject.calories.unit
    var fatUnit=jsonObject.fat.unit
    var carbsUnit=jsonObject.carbs.unit
    var proteinUnit=jsonObject.protein.unit

    $('#energy').text(energy+" "+energyUnit)
    $('#protein').text(protein+" "+proteinUnit)
    $('#fats').text(fat+" "+fatUnit)
    $('#carbs').text(carbs+" "+carbsUnit)

    $('#eMax').text("Max energy: "+energyMax+" "+energyUnit)
    $('#pMax').text("Max energy: "+proteinMax+" "+proteinUnit)
    $('#fMax').text("Max energy: "+fatMax+" "+fatUnit)
    $('#cMax').text("Max energy: "+carbsMax+" "+carbsUnit)
}