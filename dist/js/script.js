function clearRange (selectedInput) {
    selectedInput.parent().next().children().css("background", "none");
}

let eventCount = 0;
$(document).ready(function(){
    $('input.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '0',
        maxTime: '11:00pm',
        defaultTime: '00',
        startTime: '00:00',
        dynamic: true,
        dropdown: true,
        scrollbar: false,
        change: function(startDate) {
            eventCount++;
            if (eventCount < 15) return;

            if ($(this).hasClass('start-time')) {

            let $inputStart = $(this);

            clearRange($inputStart);

            let hour = $(startDate.getHours());

            const $inputEnd = $(this).next();
            
            $inputEnd.removeAttr('disabled');
            
            $inputEnd.timepicker().destroy();

            $inputEnd.timepicker({

                timeFormat: 'h:mm p',
                interval: 60,
                minTime: `${hour[0]+1}:00`,
                maxTime: '11:00pm',
                defaultTime: `${hour[0]+1}:00`,
                startTime: '00:00',
                dynamic: false,
                dropdown: true,
                scrollbar: false,

                change: function(endDate) {

                    clearRange($inputEnd);

                    let startTime = startDate.getHours();
                    let endTime = endDate.getHours();
                    let range = $inputEnd.parent().next().children();

                    for (i = startTime; i < endTime; i++) {
                        range[i].style.background = 'red';
                    }

                }


            });
  
        }

        }
    });

});

$(".btn-save").click(function(e) {
    $inputEnd.attr('disabled', true);
    $inputStart.attr('disabled', true);
    $(this)[0].style.display = "none";
    $(this).prev()[0].style.display = "block";
});



    






