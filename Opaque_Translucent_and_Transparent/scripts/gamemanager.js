///___________________  MainMenu Functions
var i_MoveToHighlightId = '#i_MoveToHighlight';
var i_ItTransmit1 = '#i_ItTransmit1';




var p_lookAtTheShapeId = '#p_lookAtTheShape';
var butterflyShapeId = '#shape_Butterfly';
var butterflyShapeLeftId = '#shape_Butterfly_left';
var butterflyShapeRightId = '#shape_Butterfly_right';
var leafShapeId = '#shape_leaf';
var leafShapeLeftId = '#shape_leaf_left';
var leafShapeRightId = '#shape_leaf_right';
var i_clickTheLineToSplitId = '#i_clickTheLineToSplit';
var b_nextId = '#b_next';
var i_nextToProceedId = '#i_nextToProceed';
var p_theseTwoObjectsId = '#p_theseTwoObjects';
var p_lookAtGivenShapeId = '#p_lookAtGivenShape';

var buildingShapeId = '#shape_building';
var buildingShapeLeftId = '#shape_building_left';
var buildingShapeRightId = '#shape_building_right';
var carShapeId = '#shape_car';
var carShapeLeftId = '#shape_car_left';
var carShapeRightId = '#shape_car_right';

var p_considerThePlaneId = '#p_considerThePlane';
var i_clickThePlainId = '#i_clickThePlain';
var buildingDeviderId = '#buildingDevider';
var carDeviderId = '#carDevider';
var b_next2Id = '#b_next2';
var p_theseTwoObjects2Id = '#p_theseTwoObjects2';
var p_completeId = '#p_complete';


var isLeafClicked = false;
var isButterFlyClicked = false;
var isBuildingDeviderClicked = false;
var isCarDeviderClicked = false;


//////////////// Variable used in AS
var p_score_instId = '#p_score_inst';
var p_comp_asId = '#p_comp_as';
var p_lessthanId = '#p_lessthan';
var p_greaterthanId = '#p_greaterthan';
var l_scoreId = '#l_score';
var release = 0;
var screenCount = 0;


function OnClickObjective() {
    SetActive('#MainMenu', false);
    SetActive('#LO', true);
    PlayVO2('#p_objective');
    DisableControlls(false);
}

function OnClickL1() {
    SetActive('#MainMenu', false);
    SetActive('#L1', true);
    SetActive(i_MoveToHighlightId, true, 0.1);
    SetOnClickListener('#m_Lance_Transparent', "");
    SetOnClickListener('#m_Lance_Translucent', "");
    SetOnClickListener('#m_Lance_Opaque', "");
    PlayVO2('#p_movetohighlight');
    DisableControlls(false);
    SetOnClickListener('#b_cube2', "");
    SetOnClickListener('#b_cube3', "");
}

function OnClickAS() {
    SetActive('#MainMenu', false);
    SetActive('#AS', true);
    PlayVO2('#p_score_instId');
    DisableControlls(false);
    SetPlayerPos();

}



///___________________  Learning Objective Functions

function OnClickObjectiveOk() {
    SetActive('#LO', false);
    //SetActive('#MainMenu',true);
  //  OnClickL1();
    StopVO2(5);
    SetActive('#MainMenu', false);
    SetActive('#L1', true);
    SetActive(i_MoveToHighlightId, true, 0.1);
    SetOnClickListener('#m_Lance_Transparent', "");
    SetOnClickListener('#m_Lance_Translucent', "");
    SetOnClickListener('#m_Lance_Opaque', "");
    PlayVO2('#p_movetohighlight');
    DisableControlls(false);
    SetOnClickListener('#b_cube2', "");
    SetOnClickListener('#b_cube3', "");
}



///___________________  Level_1 Functions
function b_cube1_click()
{
    var a = document.querySelector('#Player');
    a.setAttribute('animation', 'enabled', 'true');
    SetActive(i_MoveToHighlightId, false);
    SetActive('#b_cube1', false);
    SetActive('#i_ClicToPick1', true, 0.1);
    PlayVO2('#p_dragScreen1');
    SetOnClickListener('#m_Lance_Transparent', "Lance_Transparent()");
    SetOnClickListener('#b_cube1_click', "");

}

function Lance_Transparent() {
    SetActive('#m_Lance_Transparent', false);
    SetActive('#i_ClicToPick1', false);
    SetActive('#i_NowLookAround', true, 0.1);
    PlayVO2('#p_releaseInst');

    SetActive('#b_Opaque', false);
    SetActive('#b_Translucent', false);
    SetActive('#b_Transparent', false);

    SetActive('#b_release', true, 1.5);

    SetActive('#m_Lance_Transparent_anim', true, .25);
    AnimationMixerPlay('#m_Lance_Transparent_anim');

    var a = document.querySelector('#m_Lance_Transparent_anim');
    a.setAttribute('scale', '0.25 0.25 0.25');
    //a.setAttribute('animation', 'enabled','true');
    setTimeout(AfterAnimComplete1, 2000);
}

function AfterAnimComplete1() {
    AnimationMixerPause('#m_Lance_Transparent_anim');
}

function AfterAnimComplete2() {
    AnimationMixerPause('#m_Lance_Translucent_anim');
}

function AfterAnimComplete3() {
    AnimationMixerPause('#m_Lance_Opaque_anim');
}

function SetPlayerPos() {
    var a = document.querySelector('#player');
    a.setAttribute('position', '0 0 0');
}

function b_Release_click() {
    if (release == 0) {
        SetActive('#b_release', false);
        SetActive('#i_NowLookAround', false);
        SetActive('#m_Lance_Transparent_anim', false);
        SetActive('#m_Lance_Transparent', true, .5);
        SetActive(i_MoveToHighlightId, true, .1);
        PlayVO2('#p_movetohighlight');
        SetActive('#b_cube2', true);
        SetOnClickListener('#m_Lance_Transparent', "");
        SetOnClickListener('#b_cube2', 'b_cube2_click()');
        GetEntityById("#b_cube1").setAttribute('radius',0.000005);
        GetEntityById("#b_cube2").setAttribute('radius',0.2);
        GetEntityById("#b_cube3").setAttribute('radius',0.000005);
    } else if (release == 1) {
        SetActive('#b_release', false);
        SetActive('#i_NowLookAround', false);
        SetActive('#m_Lance_Translucent_anim', false);
        SetActive('#m_Lance_Translucent', true, .5);
        SetActive(i_MoveToHighlightId, true, .1);
        PlayVO2('#p_movetohighlight');
        SetActive('#b_cube3', true);
        SetOnClickListener('#m_Lance_Translucent', "");
        SetOnClickListener('#b_cube3', 'b_cube3_click()');
        GetEntityById("#b_cube1").setAttribute('radius',0.000005);
        GetEntityById("#b_cube2").setAttribute('radius',0.000005);
        GetEntityById("#b_cube3").setAttribute('radius',0.2);

    } else if (release == 2) {
        SetActive('#b_release', false);
        SetActive('#i_NowLookAround', false);
        SetActive('#m_Lance_Opaque_anim', false);
        SetActive('#m_Lance_Opaque', true, .5);
        SetOnClickListener('#m_Lance_Opaque', "");
        SetActive('#b_continue', true);
        SetActive('#i_Continue', true, 0.1);
        PlayVO2('#p_continueClickInst');
        GetEntityById("#b_cube1").setAttribute('radius',0.000005);
        GetEntityById("#b_cube2").setAttribute('radius',0.000005);
        GetEntityById("#b_cube3").setAttribute('radius',0.000005);

    }
    SetActive('#b_Opaque', true);
    SetActive('#b_Translucent', true);
    SetActive('#b_Transparent', true);
}

function b_cube2_click() {

    var a = document.querySelector('#Player');
    a.setAttribute('animation__1', 'enabled', 'true');
    SetActive(i_MoveToHighlightId, false);
    SetActive('#b_cube2', false);
    SetActive('#i_ClicToPick2', true, 0.1);
    PlayVO2('#p_dragScreen2');

    SetOnClickListener('#m_Lance_Translucent', "Lance_Translucent()");
    SetOnClickListener('#b_cube2_click', "");
}

function Lance_Translucent() {
    release++;
    SetActive('#m_Lance_Translucent', false);
    SetActive('#i_ClicToPick2', false);
    SetActive('#i_NowLookAround', true, 0.1);
    PlayVO2('#p_releaseInst');

    SetActive('#b_release', true);

    SetActive('#b_Opaque', false);
    SetActive('#b_Translucent', false);
    SetActive('#b_Transparent', false);

    SetActive('#m_Lance_Translucent_anim', true);
    AnimationMixerPlay('#m_Lance_Translucent_anim');

    var a = document.querySelector('#m_Lance_Translucent_anim');
    a.setAttribute('scale', '0.25 0.25 0.25');
    //	a.setAttribute('animation', 'enabled','true');
    setTimeout(AfterAnimComplete2, 1000);

}

function b_cube3_click() {

    var a = document.querySelector('#Player');
    a.setAttribute('animation__2', 'enabled', 'true');
    SetActive(i_MoveToHighlightId, false);
    SetActive('#b_cube3', false);
    SetActive('#i_ClicToPick3', true, 0.1);

    PlayVO2('#p_dragScreen3');
    SetOnClickListener('#b_cube3_click', "");
    SetOnClickListener('#m_Lance_Opaque', "Lance_Opaque()");

}

function Lance_Opaque() {
    release++;
    SetActive('#m_Lance_Opaque', false);
    SetActive('#i_ClicToPick3', false);
    SetActive('#i_NowLookAround', true, 0.1);
    PlayVO2('#p_releaseInst');

    SetActive('#b_release', true);

    SetActive('#b_Opaque', false);
    SetActive('#b_Translucent', false);
    SetActive('#b_Transparent', false);

    SetActive('#m_Lance_Opaque_anim', true);
    AnimationMixerPlay('#m_Lance_Opaque_anim');

    var a = document.querySelector('#m_Lance_Opaque_anim');
    a.setAttribute('scale', '0.25 0.25 0.25');
    //	a.setAttribute('animation', 'enabled','true');
    setTimeout(AfterAnimComplete3, 2000);

}

function b_Continue_click() {
    var a = document.querySelector('#Player');
    a.setAttribute('animation__3', 'enabled', 'true');
    SetActive('#i_Continue', false);
    SetActive('#b_continue', false);
    SetActive('#Q1_L1', true);
    PlayVO2('#p_L1Q1');
    GetEntityById("#b_cube1").setAttribute('radius',0.000005);
    GetEntityById("#b_cube2").setAttribute('radius',0.000005);
    GetEntityById("#b_cube3").setAttribute('radius',0.000005);
}

function q1_ok() {
    ok_click();
    SetActive('#Q1_L1', false);
    //SetActive('#btn_ok_1',false);
    SetActive('#Q2_L1', true);
    PlayVO2('#p_L1Q2');

}

function q2_ok() {
    ok_click();
    SetActive('#Q2_L1', false);
    //SetActive('#btn_ok_2',false);
    SetActive('#Q3_L1', true);
    PlayVO2('#p_L1Q3');

}

function q3_ok() {
    ok_click();
    SetActive('#Q3_L1', false);
    //SetActive('#btn_ok_3',false);
    SetActive('#i_ClickOnEach', true, 0.1);
    PlayVO2('#p_description_instr');
    SetOnClickListener('#m_Lance_Transparent', "ClickScreenTransparent()");
    SetOnClickListener('#m_Lance_Translucent', "ClickScreenTransulent()");
    SetOnClickListener('#m_Lance_Opaque', "ClickScreenOpaque()");

}


function ClickScreenTransparent()
 {
    screenCount++;
    SetActive('#i_ItTransmit1', true);
    PlayVO2('#p_transparent_d');
    if (screenCount == 3)
    {
        setTimeout(enableKeyConcept, 7000);
    }
    SetActive('#i_ItTransmit2', false);
    SetActive('#i_ItTransmit3', false);
    SetOnClickListener('#m_Lance_Transparent', null);
}

function ClickScreenTransulent() {
    screenCount++;

    SetActive('#i_ItTransmit2', true);
    PlayVO2('#p_translucent_d');

    if (screenCount == 3)
    {
        setTimeout(enableKeyConcept, 7000);
    }
    SetActive('#i_ItTransmit1', false);
    SetActive('#i_ItTransmit3', false);
    SetOnClickListener('#m_Lance_Translucent', null);
}

function ClickScreenOpaque() {
    screenCount++;
    SetActive('#i_ItTransmit3', true);
    PlayVO2('#p_opaque_d');

    if (screenCount == 3) {
        setTimeout(enableKeyConcept, 7000);
    }
    SetActive('#i_ItTransmit2', false);
    SetActive('#i_ItTransmit1', false);
    SetOnClickListener('#m_Lance_Opaque', null);
}


function enableKeyConcept() {
    SetActive('#i_ItTransmit1', false);
    SetActive('#i_ItTransmit2', false);
    SetActive('#i_ItTransmit3', false);
    SetActive('#i_ClickOnEach', false);
    SetActive('#p_keyConcept', true);
    PlayVO2('#p_outcome');
}

function OnClickKeyConceptOk() {
    SetActive('#p_keyConcept', false);
    SetActive('#p_LevelComplete', true);
    PlayVO2('#p_C_Inst_LevelComplete');

}

function OnClickLevelComplete() {
    SetActive('#p_LevelComplete', false);
    //	GoToMainMenu();
    SetActive('#L1', false);
    SetPlayerPos();
    OnClickAS();
}



//////////////////////////////////////
// Method used in AS


function p_score_inst_click() {
    SetActive(p_score_instId, false);
    mousehover_set(true);
    SetActive(l_scoreId, true, 0.1);
    //PlayVO2('#Q1');
    SetActive('#i_ClickOnAny', true, 0.1);
    PlayVO2('#p_dragObject');

    console.log("Mouse over value ",mousehover_get());

}


var modelNameEnable;
var modelNameDisable;
var modelNameEnableDupl;
var number = 1;
var rightanswerId = "";
var questionRightAnswer = "";
var wrongCount = 0;
var attempt = 0;


function ClickOnModels(num) {

if(mousehover_get())
{
  switch (num) {
      case 1:
          SetActive('#m_Brick_Wall', false);
          SetActive('#cm_Brick_Wall_1', true, 0.1);
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Brick_Wall';
          modelNameDisable = '#cm_Brick_Wall_1';
          modelNameEnableDupl = '#m_Brick_Wall_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Brick Wall');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Opaque";
          break;

      case 2:
          SetActive('#m_Glass', false);
          SetActive('#cm_Glass_1', true, 0.1);
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Glass';
          modelNameDisable = '#cm_Glass_1';
          modelNameEnableDupl = '#m_Glass_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Glass');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Transparent";
          break;

      case 3:
          SetActive('#m_Wood', false);
          SetActive('#cm_Wood_1', true, 0.1);
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Wood';
          modelNameDisable = '#cm_Wood_1';
          modelNameEnableDupl = '#m_Wood_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Wood');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Opaque";
          break;

      case 4:
          SetActive('#m_Cellophane', false);
          SetActive('#cm_Cellophane_1', true, 0.1);
          AnimationMixerPlay('#cm_Cellophane_1');
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Cellophane';
          modelNameDisable = '#cm_Cellophane_1';
          modelNameEnableDupl = '#m_Cellophane_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Cellophane');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Translucent";
          break;

      case 5:
          SetActive('#m_Transparent', false);
          SetActive('#cm_Transparent_1', true, 0.1);
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Transparent';
          modelNameDisable = '#cm_Transparent_1';
          modelNameEnableDupl = '#m_Transparent_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Transparent');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Transparent";
          break;

      case 6:
          SetActive('#m_Oil_Paper', false);
          SetActive('#cm_Oil_Paper_1', true, 0.1);
          AnimationMixerPlay('#cm_Oil_Paper_1');
          disableSelect();
          enableSelect();
          modelNameEnable = '#m_Oil_Paper';
          modelNameDisable = '#cm_Oil_Paper_1';
          modelNameEnableDupl = '#m_Oil_Paper_Dup';
          utility_changeText('#p_materialFill_'.concat(number), 'Oil Paper');
          rightanswerId = '#p_materialFill_'.concat(number).concat('_type');
          questionRightAnswer = "Translucent";
          break;

  }
      if (number < 7)
        {
          number++;
        }
       else
        {
          number = 1;
        }
  setTimeout(disableModel, 2000, modelNameEnable, modelNameDisable);
  disableClickOnModel();
}

}

function disableModel() {
    SetActive(modelNameEnable, false);
    SetActive(modelNameEnableDupl, true);
    SetActive(modelNameDisable, false);
    SetActive('#p_table', true);
    SetActive('#i_ClickOnAny', false);
    SetActive('#i_ClickOnDropDown', true, 0.1);
    PlayVO2('#p_clickToSelect');
}

function OpenDropDown()
{
    SetActive('#b_opequeSelect', true);
    SetActive('#b_translucentSelect', true);
    SetActive('#b_transparentSelect', true);
}


function OnDropDownOptionClick(id) {

    if (questionRightAnswer == id)
    {
        wrongCount++;
        utility_changeText(rightanswerId, id);
        SetActive('#welldone_as', true);
        setTimeout(diswelldone, 2000);
        PlayVO2('#welldoneNew');
        getScore(wrongCount);
        addScore(number - 1, wrongCount);
        enableClickOnModel();
        disableSelect();
        SetActive('#i_ClickOnDropDown', false);
        if (number > 6)
        {
          setTimeout(enablelastPanels, 3000);
        }
        wrongCount = 0;

    }
     else
     {
        wrongCount++;
        if (wrongCount < 2)
        {
            SetActive('#tryagain_as', true);
            PlayVO2('#tryagainNew');
            setTimeout(disTryagain, 2000);
        }
         else
         {
            autoCorrect_();
            PlayVO2('#currectOption');
        }
    }


}


function diswelldone() {
    SetActive('#welldone_as', false);
    if (number > 6)
    {
      SetActive('#i_ClickOnAny', false);
    }
    else {
      SetActive('#i_ClickOnAny', true, 0.1);
        PlayVO2('#p_dragObject');
    }

}

function disTryagain() {
    SetActive('#tryagain_as', false);
}

function disableSelect() {
    SetActive('#b_opequeSelect', false);
    SetActive('#b_translucentSelect', false);
    SetActive('#b_transparentSelect', false);
    SetActive('#b_select', false);


}

function enableSelect() {
    SetActive('#b_select', true);
}


function autoCorrect_()
{
    utility_changeText(rightanswerId, questionRightAnswer);
    SetActive('#b_select', false);
    addScore(number - 1, 2);
    setTimeout(enableAfterVO,2000);
    enableClickOnModel();

    wrongCount = 0;
    SetActive('#i_ClickOnDropDown', false);
}

function enableAfterVO()
{
  if (number > 6)
  {
      setTimeout(enablelastPanels, 3000);
  }
  else
  {
    SetActive('#i_ClickOnAny', true, 0.1);
    PlayVO2('#p_dragObject');
  }
}

function disableClickOnModel() {
    SetOnClickListener('#m_Brick_Wall', "");
    SetOnClickListener('#m_Glass', "");
    SetOnClickListener('#m_Wood', "");
    SetOnClickListener('#m_Cellophane', "");
    SetOnClickListener('#m_Transparent', "");
    SetOnClickListener('#m_Oil_Paper', "");
}

function enableClickOnModel() {
    SetOnClickListener('#m_Brick_Wall', "ClickOnModels(1)");
    SetOnClickListener('#m_Glass', "ClickOnModels(2)");
    SetOnClickListener('#m_Wood', "ClickOnModels(3)");
    SetOnClickListener('#m_Cellophane', "ClickOnModels(4)");
    SetOnClickListener('#m_Transparent', "ClickOnModels(5)");
    SetOnClickListener('#m_Oil_Paper', "ClickOnModels(6)");
}


function enablelastPanels()
{
    SetActive('#p_table', false);
    SetActive('#i_ClickOnDropDown', false);
    SetActive('#i_ClickOnAny', false);
    utility_changeText('#score_percent', getPercent().concat(" %"));
    SetActive('#p_comp_as', true);
    PlayVO2('#p_Assesment_Complete');
}




function p_comp_as_click()
{
    SetActive(p_comp_asId, false);
    SetActive(l_scoreId, false);
    if (getPercent() >= 60)
    {
        SetActive(p_greaterthanId, true);
        PlayVO2('#p_Assesment_GreaterThan60');
    }
    else
    {
        SetActive(p_lessthanId, true);
        PlayVO2('#p_Assesment_LessThan60');
    }
}


function p_lessthan_click()
{
    SetActive(p_lessthanId, false);
    GoToMainMenu();
}


function p_greaterthan_click()
{
    SetActive(p_greaterthanId, false);
    GoToMainMenu();
}

function GoToMainMenu()
{
    setTimeout(location.reload.bind(location), 1000);
}

function DisableControlls(bool) {
    var cam = GetEntityById('#camera');
    cam.setAttribute('wasd-controls', 'wsEnabled', bool);
    cam.setAttribute('wasd-controls', 'adEnabled', bool);
}


function btn_close_click() {
    if (login_isReferred()) {
        window.location.href = login_referred_get();
    }
}
