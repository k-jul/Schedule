function clearRange(selectedInput) {
    selectedInput.parent().next().children().css("background", "none");
}

const store = {
    'monday': [0, 6]
};

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

                clearRange($inputStart);

                let hour = $(date.getHours());

                const $inputEnd = $(this).next();

                let startTime = +$inputStart.val().split(":")[0]
                let endTime = date.getHours() === 0 ? 24 : date.getHours();

                console.log(startTime, endTime);

                $inputEnd.removeAttr('disabled');

            } else {

                let $inputEnd = $(this);


                    clearRange($inputEnd);

                    const $inputStart = $(this).prev();

                    let startTime = +$inputStart.val().split(":")[0];
                    let endTime = date.getHours() === 0 ? 24 : date.getHours();
                    let range = $inputEnd.parent().next().children();

                    if (startTime >= endTime) console.log('Wrong!');

                    for (i = startTime; i < endTime; i++) {
                        range[i].style.background = 'red';
                    }

            }

            // $inputEnd.timepicker().destroy();

            // $inputEnd.timepicker({

            //     timeFormat: 'HH:mm',
            //     interval: 60,
            //     minTime: `${hour[0]+1}:00`,
            //     // maxTime: '11:00pm',
            //     maxHour: '0',
            //     defaultTime: `${hour[0]+1}:00`,
            //     startTime: '0:00',
            //     dynamic: true,
            //     dropdown: true,
            //     scrollbar: false,

            //     change: function(endDate) {

            //         clearRange($inputEnd);

            //         let startTime = startDate.getHours();
            //         let endTime = endDate.getHours();
            //         let range = $inputEnd.parent().next().children();

            //         for (i = startTime; i < endTime; i++) {
            //             range[i].style.background = 'red';
            //         }

            //     }


            // });



        }
    });

});

$(".btn-save").click(function (e) {

    let inputs = $(this).parent().prev().prev().children();
    let startValue = inputs[0].value;
    let endValue = inputs[1].value;

    console.log(startValue.split(':'));




});