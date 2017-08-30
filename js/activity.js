
let Activity = (function(){

    let activities= [{"time":"2017-08-29 17:08","activity":"afafaf"}];
    
    //bind ui events

    //dom cache
    const $app = $('#app')
    const $input = $app.find('input.activity-text');
    const $goButton = $app.find('button.go-btn');
    // const $closeButton = $app.find('i.fa.fa-times-circle')
    const $activityList = $app.find('ul.activity-list');
    const template = $app.find('#list-item-template').html();

    //bindUI
    $goButton.on('click', addActivity)
    $activityList.on('click', 'i.fa.fa-times-circle', removeActivity)
    _render()


    //render
    function _render(){
        $activityList.empty()
        for( let {activity:a, time:t} of activities){
            $activityList.append($(template).clone().prepend(`${t}: I am ${a}`));
        }
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
                
        activities.push({activity, time});
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
    return {
        addActivity
    }
})();