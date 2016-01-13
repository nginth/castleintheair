var START_DATE = 1929;
var END_DATE = 1945;

$.getJSON('/static/data.json', makeDJIChart);

function makeDJIChart(djiJSON, callback){
    var djiData = {
        labels: [],
        datasets:[
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    $.each(djiJSON, function(index, element){
        var date = parseInt(element.date.split("-")[0]);
        if(date >= START_DATE &&  date <= END_DATE){
            djiData.labels.push(element.date);
            djiData.datasets[0].data.push(element.avg);
        }
    });

    //incoming hack
    for(var i = 0; i < djiData.labels.length; i++){
        if(!(i % 6 == 0)){
            djiData.labels[i] = "";
        }
    }
    
    var djiContext = $("#dji").get(0).getContext("2d");
    var djiChart = new Chart(djiContext).Line(djiData, {
        pointDot: false,
        responsive: true,
        maintainAspectRation: false
    });

}