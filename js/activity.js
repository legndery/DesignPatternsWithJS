
let Activity = (function(){

    let activities= [];
    
    //bind ui events

    //dom cache
    const $app = $('#app')
    const $input = $app.find('input.activity-text');
    const $goButton = $app.find('button.go-btn');
    const $activityList = $app.find('ul.activity-list');
    const $template = $('<li />', {"class": "item"})

    //bindUI
    $goButton.on('click', addActivity)

    //render
    var _render = () => {
        $activityList.empty()
        activities.forEach(v => {
            $activityList.append($template.clone().text(v));
        });
    }
    
    //methods
    function addActivity(v) {
        const val = (typeof v == "string")?v:$input.val();
        activities.push(val);
        _render();
    }

    return {
        addActivity,
    }
})();