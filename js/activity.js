
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
        for( let {activity:a, time:t} of activities){
            $activityList.append($template.clone().text(`${t}: I am doing ${a}`));
        }
    }

    //methods
    function addActivity(v) {
        const activity = (typeof v == "string")?v:$input.val();
        const time = (new Date()).toISOString();
        activities.push({activity, time});
        _render();
    }

    return {
        addActivity
    }
})();