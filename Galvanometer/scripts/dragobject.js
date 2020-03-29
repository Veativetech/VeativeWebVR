var drag_dragable=[];
var drag_additem=true;
var question_chances = {};
var drag_currentQuestionId=0;

var i_Q1Id = '#i_Q1';
var i_Q2Id = '#i_Q2';
var i_Q3Id = '#i_Q3';
var i_Q4Id = '#i_Q4';
var i_Q5Id = '#i_Q5';
var i_A1Id = '#i_A1';
var i_A2Id = '#i_A2';
var i_A3Id = '#i_A3';
var i_A4Id = '#i_A4';
var i_A5Id = '#i_A5';


var b_Ok1ASId = '#b_Ok1';
var b_Ok2ASId = '#b_Ok2';
var b_Ok3ASId = '#b_Ok3';
var b_Ok4ASId = '#b_Ok4';
var b_Ok5ASId = '#b_Ok5';

var welldoneId='#welldone_d';
var tryagainId='#tryagain_d';


AFRAME.registerComponent('dragit', {
// Could use a schem to preserve the color! then simply change it on update
// if clicked?
schema: {
   enabled: {type: 'string', default: 'true'}
},

init: function () {

var element=this;
//drag_AddObject(this.el.id);


this.el.addEventListener('mousedown', function (evt) {


  let isObject=drag_HasObject(element.el.getAttribute('id'));


  if(element.data.enabled=='true' && isObject)
  {
    dragObject(this);
  }

});

this.el.addEventListener('mouseup', function (evt) {

  //let isEnable=element.getAttribute('dragit','enabled');

  let isObject=drag_HasObject(element.el.getAttribute('id'));

  if(element.data.enabled=='true' && isObject)
  {
    dropObject(this);
  }

});


// window.addEventListener("keydown", function(event) {
//
//   let isObject=drag_HasObject(element.el.getAttribute('id'));
//
//
//   if(element.data.enabled=='true' && isObject)
//   {
//     dragObject(this);
//   }
//
// }, true);
//
//
window.addEventListener("keyup", function(event) {
  //alert("key: " + event.key + ", code: " + event.code);
  let isObject=drag_HasObject(element.el.getAttribute('id'));

  if(element.data.enabled=='true' && isObject)
  {
    dropObject(this);
  }

}, true);


},


tick : function ()
{
  //console.clear();
  //if(active!=null)
  //  console.log(GetWorldPositionN(active));
//  console.clear();
//  console.log(hit_objects);
}
});



var cam = document.querySelector('a-camera');


var parent=null;
var active=null;
var pos=null;
var scale=null;


function dragObject(item)
{

  if(active==null)
  {
      parent=item.parentNode;

      active=item;

      let ctrl = document.querySelector(controllerId);
      ctrl.object3D.el.appendChild(item);

      let pos=dragdrop_getPosition(item.id);
      let scale=dragdrop_getScale(item.id);

      item.setAttribute('position',pos);
      item.setAttribute('setactive','scale',scale);
  }

}



function dropObject(item)
{
    if(active!=null)
    {
      let gindex=-1;

      hit_objects.forEach(myFunction);

      if(hit_objects.length==0)
      gindex=-10;

      function myFunction(itemL, index, arr) {

        //console.log(item.id);
        //console.log(dragdrop_getQuestionId(item.id));
        //console.log(drag_currentQuestionId+1);

        if(dragdrop_getQuestionId(item.id)== drag_currentQuestionId+1 && itemL.id==dragdrop_getAnswerId(item.id))
        {
          gindex=index;
          return;
        }
      }

      if(gindex==-1)
      {
        parent.appendChild(active);
        onWrongAnswer(active.getAttribute('id'));
      }else if (gindex==-10) {
        parent.appendChild(active);
      }
      else {

        parent.appendChild(active);
        active.setAttribute('position','0 0 -7');
        //console.log("removing id ",active.getAttribute('id'));
        drag_DeleteObject(active.getAttribute('id'));
        //console.log("ree ",drag_HasObject(active.getAttribute('id')))
        onRightAnswer(active.getAttribute('id'));

      }

      active=null;
    }
}

function onRightAnswer(id)
{
  drag_currentQuestionId += 1;
  question_chances[id]=question_chances[id]-1;
  addScore(dragdrop_getQuestionId(id),3-question_chances[id]);
  SetActive(welldoneId,true,0.05);
  PlayVO2('#welldone');
  setTimeout(disablewelldonettyagain,2000);
  enableokaftercorrect(id);
  //Add Score Entry
}


function onWrongAnswer(id)
{

  let qIdForCurrect=dragdrop_getQuestionNameById(drag_currentQuestionId+1);

  question_chances[qIdForCurrect]=question_chances[qIdForCurrect]-1;

  if(question_chances[qIdForCurrect]==0)
  {
  //  PlayVO2('#currectOption');
  //  console.log(dragdrop_getQuestionId(qIdForCurrect)," : ",3-question_chances[qIdForCurrect]);
    doAutoCurrect(qIdForCurrect);
    drag_DeleteObject(qIdForCurrect);
    addScore(dragdrop_getQuestionId(qIdForCurrect),3-question_chances[qIdForCurrect]);
  }
  else
  {
    SetActive(tryagainId,true,0.1);
    setTimeout(disablewelldonettyagain,2000);
    PlayVO2('#tryagain');
  }
}

function doAutoCurrect(id)
{
    //Add Score Entry
    drag_currentQuestionId += 1;
    setTimeout(afterAutoCorrect(id),3000);
    let element=document.querySelector('#'.concat(id));
    element.setAttribute('position','0 0 -7');
}

function afterAutoCorrect(id)
{
  //question wise pannel appear
  if(id=="ElectroMagnet_lvlAs")
  {
    SetActive(i_A1Id,true,0.1);
    SetActive(i_Q1Id,false);
    PlayVO2(i_A1Id);
    //panel true
  }
  else if (id=="Ring_lvlAs")
  {
    //panel true
    SetActive(i_A2Id,true,0.1);
    SetActive(i_Q2Id,false);
    PlayVO2(i_A2Id);
  }


  else if (id=="Niddle_lvlAs")
  {
    //panel true
    SetActive(i_A3Id,true,0.1);
    SetActive(i_Q3Id,false);
    PlayVO2(i_A3Id);
  }
  else if (id=="Magnet_lvlAs")
   {
    //panel true
    SetActive(i_A4Id,true,0.1);
    SetActive(i_Q4Id,false);
    PlayVO2(i_A4Id);
  }
  else if (id=="Meter_lvlAs")
  {
    //panel true
    SetActive(i_A5Id,true,0.1);
    SetActive(i_Q5Id,false);
    PlayVO2(i_A5Id);
  }

  enableokaftercorrect(id);
}



function enableokaftercorrect(id)
{
  if(id=="ElectroMagnet_lvlAs")
  {
    SetActive(b_Ok1ASId,true);
    SetActive(i_Q1Id,false);
    // ok true
  }
  else if (id=="Ring_lvlAs")
  {
    SetActive(b_Ok2ASId,true);
    SetActive(i_Q2Id,false);
  }

  else if (id=="Niddle_lvlAs")
  {
    SetActive(b_Ok3ASId,true);
    SetActive(i_Q3Id,false);
  }
  else if (id=="Magnet_lvlAs")
  {
    SetActive(b_Ok4ASId,true);
    SetActive(i_Q4Id,false);
  }
  else if (id=="Meter_lvlAs")
  {
    SetActive(b_Ok5ASId,true);
    SetActive(i_Q5Id,false);
  }

  // question wise ok appear

}

function dragdrop_getAnswerId(id)
{
    if(id=="ElectroMagnet_lvlAs")
    return "TransparentMotorAS";

    if(id=="Meter_lvlAs")
    return "TransparentScaleAS";


    if(id=="Niddle_lvlAs")
    return "TransparentNeedleAS";

    if(id=="Ring_lvlAs")
    return "TransparentRingAS";

    if(id=="Magnet_lvlAs")
    return "TransparentMagnetAS";

    return "";

}


function dragdrop_getQuestionNameById(index)
{
    if(index==1)
    return "ElectroMagnet_lvlAs";

    if(index==5)
    return "Meter_lvlAs";

    if(index==3)
    return "Niddle_lvlAs";

    if(index==2)
    return "Ring_lvlAs";

    if(index==4)
    return "Magnet_lvlAs";

    return "";
}



function dragdrop_getQuestionId(id)
{
    if(id=="ElectroMagnet_lvlAs")
    return 1;

    if(id=="Meter_lvlAs")
    return 5;


    if(id=="Niddle_lvlAs")
    return 3;

    if(id=="Ring_lvlAs")
    return 2;

    if(id=="Magnet_lvlAs")
    return 4;

    return 0;
}



function dragdrop_getPosition(id)
{

  let pos="0 -0.5 -2";

  if(id=='Ring_lvlAs')
  pos="0 -0.25 -2";

  if(id=='ElectroMagnet_lvlAs')
  pos="0 0 -2";

return pos;

}



function dragdrop_getScale(id)
{
  let scale="0.05 0.05 0.05";

  if(id=='Ring_lvlAs')
  scale="0.1 0.1 0.1";

  if(id=='ElectroMagnet_lvlAs')
  scale="0.075 0.075 0.075";

return scale;
}


function drag_AddObject(item)
{
 if(drag_dragable.indexOf(item)==-1 && drag_additem)
 {
   drag_dragable.push(item);
   question_chances[item]=3;
 }

 if(drag_dragable.length>4)
 drag_additem=false;
}

function drag_DeleteObject(item)
{
  let index=drag_dragable.indexOf(item);
 if(index>-1)
 drag_dragable.splice(index, 1);
}

function drag_HasObject(item)
{
 if(drag_dragable.indexOf(item)!=-1)
 {
   return true;
 }
 else {
    return false;
 }
}

function disablewelldonettyagain()
{
  SetActive(welldoneId,false);
  SetActive(tryagainId,false);
}
