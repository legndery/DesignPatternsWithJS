let Stats = (function(){

    let activities=0;

    //dom cache

    const $app = $('#stats');
    const $stat = $app.find('.stat-text');

    //bind events
    PubSub.subscribe("activityChanged", function(count){
        setActivities(count);
    })
    //render
    const _render = () => {
        $stat.text(activities);
    }
    _render();

    //methods
    function setActivities(i){
        activities = i;
        _render();
    }

    return {
        setActivities,
    }
})();