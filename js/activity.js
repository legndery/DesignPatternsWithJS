
let Activity = (function(){

    let activities= [];
    let showing = activities.length;
    //bind ui events

    //dom cache
    const $app = $('#app')
    const $input = $app.find('input.activity-text');
    const $goButton = $app.find('button.go-btn');
    const $listTitle = $app.find('.list-title span')
    const $activityList = $app.find('ul.activity-list');
    const $searchInput = $app.find('.search-text');
    const template = $app.find('#list-item-template').html();

    //bindUI
    $goButton.on('click', addActivity)
    $activityList.on('click', 'i.fa.fa-times-circle', removeActivity)
    $searchInput.on('input', search);
    _render()


    //render
    function _render(){
        $activityList.empty();
        showing = 0;
        for( let {activity:a, time:t, display} of activities){
            if(display){
                const $template = $(template).clone();
                $template.find('.date').text(t);
                $template.find('.text').text(`I am ${a}`);
                $activityList.append($template);
                showing++;
            }
                
        }
        PubSub.publish("activityChanged", activities.length);
        $listTitle.text(` (${showing} of ${activities.length})`);
    }
    
    const _getDate = (d)=>{

        function pad(number) {
            if (number < 10) {
              return '0' + number;
            }
            return number;
          }
          return d.getUTCFullYear() +
          '-' + pad(d.getUTCMonth() + 1) +
          '-' + pad(d.getUTCDate()) +
          ' ' + pad(d.getUTCHours()) +
          ':' + pad(d.getUTCMinutes());
    }
    //methods
    function addActivity(e) {
        const activity = (typeof e == "string")?e:$input.val();
        const time= _getDate(new Date());
        const display = true;

        activities.push({activity, time, display});
        $input.val('');
        _render();
    }
    function removeActivity(e){
        let i;
        if(typeof e == "number"){
            i = e;
        }else{
            const $remove = $(e.target).closest('li');
            
            i = $activityList.find('li').index($remove);
            console.log(i);
        }
        activities.splice(i,1);
        _render();
    }
    function search(e){
        const q = (typeof e == "string")?e:$searchInput.val();
        for(let i =0;i<activities.length;i++){
            if(activities[i].activity.indexOf(q)<0){
                activities[i].display = false;
            }else{
                activities[i].display = true;
            }
        }
        _render();
    }
    return {
        addActivity,
        removeActivity,
        search
    }
})();