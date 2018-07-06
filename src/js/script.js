let eventCount = 0;
$(document).ready(function () {
    $('input.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 60,
        minTime: '0',
        maxTime: '11:00pm',
        defaultTime: '00',
        startTime: '00:00',
        dynamic: true,
        dropdown: true,
        scrollbar: false,
        change: function (date) {
            eventCount++;
            if (eventCount < 15) return;

            if ($(this).hasClass('start-time')) {

                let $inputStart = $(this);

                let hour = $(date.getHours());

                const $inputEnd = $(this).next();

                let startTime = +$inputStart.val().split(":")[0]
                let endTime = date.getHours() === 0 ? 24 : date.getHours();

                $inputEnd.removeAttr('disabled');

            } else {

                let $inputEnd = $(this);


                    const $inputStart = $(this).prev();

                    let startTime = +$inputStart.val().split(":")[0];
                    let endTime = date.getHours() === 0 ? 24 : date.getHours();
                    let range = $inputEnd.parent().next().children();

                    if (startTime >= endTime) alert('A shift should be at leeast 1 hour');


            }
        }
    });

});

let shifts = {
    "mon": [],
    "tue": [],
    "wed": [],
    "thu": [],
    "fr": [],
    "sat": [],
    "sun": []
}

$(".btn-add").click(function (e) {

    let newShift = [];

    let timeRange = $(this).parent();
    let weekDayId = timeRange.prev().attr('id');

    let startValue = timeRange.children()[0].value;
    let endValue = timeRange.children()[1].value;

    let start = +startValue.split(':')[0];
    let end = +endValue.split(':')[0] === 0 ? 24 : +endValue.split(':')[0];

    newShift.push(start, end);

    shifts[weekDayId].push(newShift);

    updateRange(weekDayId);

});

function updateRange (day) {

    let dayId = "#" + day;

    let scale = $(dayId).next().next().children();
    console.log(scale);

    for (i = 0; i < shifts[day].length; i++) {
        
        for (j = shifts[day][i][0]; j < shifts[day][i][1]; j++) {

            if (j>18 && j<= 24 || j>=0 && j <=6) scale[j].style.background = "lightblue";
           // debugger;
            else scale[j].style.background = "#FAFF84";
        }
}
}

$(".btn-delete").click(function (e) {
    let confirmation = confirm("Day schedule will be cleared. Continue?");
    if (!confirmation) return;
    let day = $(this).attr("id").split("-")[0];
    $("#" + day).next().next().find(".scale-item").css("background", "#EBEBEE");
    shifts[day] = [];
    
});


