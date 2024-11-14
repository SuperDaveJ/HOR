// JavaScript Document
//=========== This is for NRC Incidant Response Course ============================
//----------- Following function are added to handle objective status -------------
//----------- Febuary, 2006                                           -------------

// strObjStatus is defined and its value is set in NRCFunctions
// number of objectives for each lesson
arrLessonObjectives = new Array(7,8,11,3);
// number of objectives for each lesson
nObjs = 29;	

function getObjectiveStatus(objID)
{	// objID = objective ID
	//getSuspendData();
	if (strObjStatus.indexOf(objID) != -1) return true
	else return false
}

function setObjectiveStatus(objID)
{	//this function is called from preassessment and self-check questions
	// objID = objective ID
	//getSuspendData();
	if ( typeof(strObjStatus) != "undefined" )
		if (!getObjectiveStatus(objID)) strObjStatus = strObjStatus + "," + objID
	updateSuspendData();
}

//----------- MyCourse popup functions ----------------------
//External stylesheet will not work.  That's why it's included here.
//Initialize some popup menu variables.
var intBoxWidth = 300;
var intBoxHeight = 80;	// This will change based on how many items there are.
var intXOffset = -50;
var intYOffset = -80;	// Y offset is normally the same as the box height
var strOverflowY = "hidden"		//can be auto, scroll, hidden, visible.  auto does not work well.
var strCourseTitle = "NRC Incident Response Course Overview"		//used in 508 and normal menu layers.
var strLessonTitle_1 = "Lesson 1: Emergency Response Overview"
var strLessonTitle_2 = "Lesson 2: Event Classification and Response Modes"
var strLessonTitle_3 = "Lesson 3: NRC Response Operations"
var strLessonTitle_4 = "Lesson 4: General NRC Response Team Member Instructions"
var lT1 = 0
var lT2 = 0
var lT3 = 0
var lT4 = 0
var strCompletedText = "You have completed this module. Here is the list of all the objectives."
var strInstruction = "Select an objective to navigate to its starting page."
var intInstructionHeight = 20; 		//the height of the instruction area below the title
/*
var strCourseRoot
strCourseRoot = window.location.href.substring(0, window.location.href.lastIndexOf("/"))
strCourseRoot = strCourseRoot.substring(0, strCourseRoot.lastIndexOf("/")+1)
alert("strCourseRoot = " + strCourseRoot)
*/

// *********** Use a 2-D array to hold objective information ************
// 0 - first index is objective ID
// 1 - second index is the topic title of the that objective
// 2 - third index is the URL to the first page of that objective
// 3 - fourth index is the status for that objective. 0 = not passed, 1 = passed.
arrObjs = new Array(nObjs);
for (var i=0; i<nObjs; i++)
	arrObjs[i] = new Array(4);
//initialize objective IDs, Titles, and URLs to the first page of each objective

//Lesson 1 objectives
//objective 01
arrObjs[0][0] = "111"	
arrObjs[0][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Licensee Role"	
arrObjs[0][2] = "../lesson1/11040.htm"
arrObjs[0][3] = 0	
//objective 02
arrObjs[1][0] = "112"	
arrObjs[1][1] = "&nbsp;&nbsp;&nbsp;&nbsp;State/Local Role"	
arrObjs[1][2] = "../lesson1/11060.htm"
arrObjs[1][3] = 0
//objective 03
arrObjs[2][0] = "113"	
arrObjs[2][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Public Role"	
arrObjs[2][2] = "../lesson1/11080.htm"
arrObjs[2][3] = 0
//objective 04
arrObjs[3][0] = "114"	
arrObjs[3][1] = "&nbsp;&nbsp;&nbsp;&nbsp;NRC Roles - 1"	
arrObjs[3][2] = "../lesson1/11100.htm"
arrObjs[3][3] = 0
//objective 05
arrObjs[4][0] = "115"	
arrObjs[4][1] = "&nbsp;&nbsp;&nbsp;&nbsp;NRC Roles - 2"	
arrObjs[4][2] = "../lesson1/11120.htm"
arrObjs[4][3] = 0
//objective 06
arrObjs[5][0] = "116"	
arrObjs[5][1] = "&nbsp;&nbsp;&nbsp;&nbsp;NRC NRP Role"	
arrObjs[5][2] = "../lesson1/11170.htm"
arrObjs[5][3] = 0
//objective 07
arrObjs[6][0] = "117"	
arrObjs[6][1] = "&nbsp;&nbsp;&nbsp;&nbsp;INS Response"	
arrObjs[6][2] = "../lesson1/11190.htm"
arrObjs[6][3] = 0

//Lesson 2 objectives
//objective 08
arrObjs[7][0] = "121"	
arrObjs[7][1] = "&nbsp;&nbsp;&nbsp;&nbsp;HOO"	
arrObjs[7][2] = "../lesson2/12020.htm"
arrObjs[7][3] = 0
//objective 09
arrObjs[8][0] = "122"	
arrObjs[8][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Non-Emergency"	
arrObjs[8][2] = "../lesson2/12030.htm"
arrObjs[8][3] = 0
//objective 10
arrObjs[9][0] = "123"	
arrObjs[9][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Further Analysis"	
arrObjs[9][2] = "../lesson2/12040.htm"
arrObjs[9][3] = 0
//objective 11
arrObjs[10][0] = "124"	
arrObjs[10][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Threat Assessment"	
arrObjs[10][2] = "../lesson2/12080.htm"
arrObjs[10][3] = 0
//objective 12
arrObjs[11][0] = "125"	
arrObjs[11][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Escalation"	
arrObjs[11][2] = "../lesson2/12090.htm"
arrObjs[11][3] = 0
//objective 13
arrObjs[12][0] = "126"	
arrObjs[12][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Event Classes"	
arrObjs[12][2] = "../lesson2/12130.htm"
arrObjs[12][3] = 0
//objective 14
arrObjs[13][0] = "127"	
arrObjs[13][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Event Classes 2"	
arrObjs[13][2] = "../lesson2/12150.htm"
arrObjs[13][3] = 0
//objective 15
arrObjs[14][0] = "128"	
arrObjs[14][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Response Modes"	
arrObjs[14][2] = "../lesson2/12170.htm"
arrObjs[14][3] = 0

//Lesson 3 objectives
//objective 16
arrObjs[15][0] = "131"	
arrObjs[15][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Executive Team"	
arrObjs[15][2] = "../lesson3/13040.htm"
arrObjs[15][3] = 0
//objective 17
arrObjs[16][0] = "132"	
arrObjs[16][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Reactor Safety Team"	
arrObjs[16][2] = "../lesson3/13060.htm"
arrObjs[16][3] = 0
//objective 17
arrObjs[17][0] = "133"	
arrObjs[17][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Fuel Cycle Safety Team"	
arrObjs[17][2] = "../lesson3/13090.htm"
arrObjs[17][3] = 0
//objective 17
arrObjs[18][0] = "134"	
arrObjs[18][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Base Team"	
arrObjs[18][2] = "../lesson3/13110.htm"
arrObjs[18][3] = 0
//objective 17
arrObjs[19][0] = "135"	
arrObjs[19][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Site Team"	
arrObjs[19][2] = "../lesson3/13120.htm"
arrObjs[19][3] = 0
//objective 18
arrObjs[20][0] = "136"	
arrObjs[20][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Protective Measures Team"	
arrObjs[20][2] = "../lesson3/13140.htm"
arrObjs[20][3] = 0
//objective 19
arrObjs[21][0] = "137"	
arrObjs[21][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Liaison Team"	
arrObjs[21][2] = "../lesson3/13160.htm"
arrObjs[21][3] = 0
//objective 19
arrObjs[22][0] = "138"	
arrObjs[22][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Safeguards Team"	
arrObjs[22][2] = "../lesson3/13170.htm"
arrObjs[22][3] = 0
//objective 20
arrObjs[23][0] = "139"	
arrObjs[23][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Executive Team Support Team"	
arrObjs[23][2] = "../lesson3/13190.htm"
arrObjs[23][3] = 0
//objective 21
arrObjs[24][0] = "13a"	
arrObjs[24][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Operations Support Team"	
arrObjs[24][2] = "../lesson3/13210.htm"
arrObjs[24][3] = 0
//objective 22
arrObjs[25][0] = "13b"	
arrObjs[25][1] = "&nbsp;&nbsp;&nbsp;&nbsp;NRC News Center"	
arrObjs[25][2] = "../lesson3/13230.htm"
arrObjs[25][3] = 0

//Lesson 4 objectives
//objective 23
arrObjs[26][0] = "141"	
arrObjs[26][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Personnel Information Database"	
arrObjs[26][2] = "../lesson4/14020.htm"
arrObjs[26][3] = 0
//objective 24
arrObjs[27][0] = "142"	
arrObjs[27][1] = "&nbsp;&nbsp;&nbsp;&nbsp;Responding to an Event"	
arrObjs[27][2] = "../lesson4/14040.htm"
arrObjs[27][3] = 0
//objective 25
arrObjs[28][0] = "143"	
arrObjs[28][1] = "&nbsp;&nbsp;&nbsp;&nbsp;General Instructions"	
arrObjs[28][2] = "../lesson4/14060.htm"
arrObjs[28][3] = 0

function getNumOfObjFailed()
{
	//determine how many objectives are failed
	var nObjFailed = 0;
	for (var i=0; i<nObjs; i++) {
		if (getObjectiveStatus(arrObjs[i][0])) {
			arrObjs[i][3] = 1
		} else {
			arrObjs[i][3] = 0
			nObjFailed += 1
		}
	}
	return nObjFailed;
}

function createMy508Course()
{
	//This function is called on every page when page load.
	if (intVersion == 1) {
		//508 LMS version only
		var nObjFailed = 0;
		var strHTML = "";
		if (verNumber == 3) nObjFailed = getNumOfObjFailed()
		strHTML = "<p>" + strCourseTitle + "</p>"
		if ( (nObjFailed > 0) && (verNumber == 3) ) {
			strHTML = strHTML + "<ol>"
				for (var i=0; i<nObjs; i++) {
				if(arrObjs[i][0] < 121){
					if(lT1 == 0){
						lT1 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_1 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 117 && arrObjs[i][0] < 131){
					if(lT2 == 0){
						lT2 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_2 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 128 && arrObjs[i][0] < 141){
					if(lT3 == 0){
						lT3 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_3 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 140){
					if(lT4 == 0){
						lT4 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_4 + "</b></span> </div>"
					}
				}				
					
					if (arrObjs[i][3] != 1)
						strHTML = strHTML + "<li><a href='" + arrObjs[i][2] + "?ver=" + verNumber + "' onClick='javascript:closing=false'>" + arrObjs[i][1] + "</a></li>"
				}
			strHTML = strHTML + "</ol>"
		} else {
			if (verNumber == 3) {
				strHTML = strHTML + strCompletedText
			} else {
				strHTML = strHTML + strInstruction
			}
			strHTML = strHTML + "<ol>"
				for (var i=0; i<nObjs; i++) {
				if(arrObjs[i][0] < 121){
					if(lT1 == 0){
						lT1 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_1 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 117 && arrObjs[i][0] < 131){
					if(lT2 == 0){
						lT2 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_2 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 128 && arrObjs[i][0] < 141){
					if(lT3 == 0){
						lT3 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_3 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 140){
					if(lT4 == 0){
						lT4 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_4 + "</b></span> </div>"
					}
				}
					
					strHTML = strHTML + "<li><a href='" + arrObjs[i][2] + "?ver=" + verNumber + "' onClick='javascript:closing=false'>" + arrObjs[i][1] + "</a></li>"
				}
			strHTML = strHTML + "</ol>"
		}
		document.getElementById('item1508').innerHTML = strHTML;
	}
}

var oGoto = window.createPopup();
function gotoPopup()
{
window.focus()
var lT1 = 0
var lT2 = 0
var lT3 = 0
var lT4 = 0	
if ( intVersion == 2 ) {
//Normal LMS version
	var nObjFailed = 0; 	//used to determine the popup box size
	if (verNumber == 4) {
		//LMS version
		//update info before jump
		var strTemp = getElementStyle('Next','visibility','visibility')
		if ( strTemp == "visible" ) {
			// only if all popup pages have been viewed
			updateSuspendData();
		}
		
		nObjFailed = getNumOfObjFailed()
		//set the height of the popup menu based on how many items there are
		switch (nObjFailed) {
			case 0:
				//1 line text, intInstructionHeight=20. 2-line text, intInstructionHeight=38
				intInstructionHeight = 38;
				intBoxHeight = 100;
				intYOffset = -100;
				break;
			case 1:
				intBoxHeight = 60;
				intYOffset = -60;
				break;
			case 2:
				intBoxHeight = 80;
				intYOffset = -80;
				break;
			case 3:
				intBoxHeight = 100;
				intYOffset = -100;
				break;
			case 4:
				intBoxHeight = 120;
				intYOffset = -120;
				break;
			case 5:
				intBoxHeight = 140;
				intYOffset = -140;
				break;
			default :
				intBoxHeight = 140;
				intYOffset = -140;
				strOverflowY = "scroll"		//set vertical scroll
		} 
	} else {
			//CD version
				intBoxHeight = 140;
				intYOffset = -140;
				strOverflowY = "scroll"		//set vertical scroll
	}
	var strHTML = ""
	var strMouseOver = "this.style.color='#FFFFFF', this.style.background='#744857'";
	var strMouseOut = "this.style.color='#744857', this.style.background='#FFFFFF'";
	var strLinkStyle = 'color:#744857; font-family:arial; font-size:11px; height:20px; background:#FFFFFF; border-left:2px solid #480015; border-top:1px solid #480015; border-right:2px solid #480015; border-bottom:none; padding:2px; padding-left:10px; cursor:hand;';

	var styBox = "<div style='position:absolute; top:0; left:0; overflow-y:" + strOverflowY + "; overflow-x:hidden; width:" + intBoxWidth + "; height:" + intBoxHeight + "; scrollbar-base-color:#DDDDDD; border-bottom:2px solid #480015; SCROLLBAR-HIGHLIGHT-COLOR: #EEEEEE; SCROLLBAR-ARROW-COLOR: black;'>"
	var styTitle = "<div style='color:#000000; font-family:arial; font-size:11px; height:20px; background:#FFFFFF; border-left:2px solid #480015; border-top:2px solid #480015; border-right:2px solid #480015; border-bottom:none; padding:2px; padding-left:10px; cursor:default;'>"
	var styInstruction = "<div style='color:#000000; font-family:arial; font-size:11px; height:" + intInstructionHeight + "px; background:#FFFFFF; border-left:2px solid #480015; border-top:none #480015; border-right:2px solid #480015; border-bottom:none; padding:2px; padding-left:10px; cursor:default;'>"
	var styLinkedItem = "<div onMouseOver=\"" + strMouseOver + "\" onMouseOut=\"" + strMouseOut + "\" style=\"" + strLinkStyle + "\">"
	strHTML = strHTML + styBox + styTitle + "<span><b>" + strCourseTitle + "</b></span> </div>"
	if ( nObjFailed > 0 ) {
		strHTML = strHTML + styInstruction + "<span>" + strInstruction + "</span> </div>"
		for (var i=0; i<nObjs; i++) {
				if(arrObjs[i][0] < 121){
					if(lT1 == 0){
						lT1 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_1 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 117 && arrObjs[i][0] < 131){
					if(lT2 == 0){
						lT2 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_2 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 128 && arrObjs[i][0] < 141){
					if(lT3 == 0){
						lT3 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_3 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 140){
					if(lT4 == 0){
						lT4 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_4 + "</b></span> </div>"
					}
				}
			if (arrObjs[i][3] != 1) {
				strHTML = strHTML + styLinkedItem + "<span onClick='javascript:parent.whereToGo(\"" + arrObjs[i][2] + "\")'>" + arrObjs[i][1] + "</span></div>"
			}
		}
	} else {
		if (verNumber == 4) {
			//LMS version
			strHTML = strHTML + styInstruction + "<span>" + strCompletedText + "</span> </div>"
		} else {
			//CD version
			strHTML = strHTML + styInstruction + "<span>" + strInstruction + "</span> </div>"
		}
		for (var i=0; i<nObjs; i++) {
				if(arrObjs[i][0] < 121){
					if(lT1 == 0){
						lT1 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_1 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 117 && arrObjs[i][0] < 131){
					if(lT2 == 0){
						lT2 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_2 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 128 && arrObjs[i][0] < 141){
					if(lT3 == 0){
						lT3 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_3 + "</b></span> </div>"
					}
				}
				if(arrObjs[i][0] > 140){
					if(lT4 == 0){
						lT4 = 1
						strHTML += styTitle  + "<span><b>" + strLessonTitle_4 + "</b></span> </div>"
					}
				}
				strHTML = strHTML + styLinkedItem + "<span onClick='javascript:parent.whereToGo(\"" + arrObjs[i][2] + "\")'>" + arrObjs[i][1] + "</span></div>"
		}
	}
	strHTML = strHTML + "</div>"
	//oModuleMapHTML.innerHTML = strHTML
	oGoto.document.body.innerHTML = strHTML
    //oGoto.document.body.innerHTML = oModuleMapHTML.innerHTML; 
	//the dimensions need to match that of scroll box layer
	//the position is relative to ModuleMap object
	oGoto.show(intXOffset, intYOffset, intBoxWidth, intBoxHeight, mnuMyCourse);
} //end if
} //End of function

function whereToGo(pageURL) {
	//Changed for this course. User can go anywhere on the menu.
	//if (isPageViewed(pageURL)) {
		closing = false;
		location.href = pageURL + "?ver=" + verNumber;
	//} else {
	//	alert("You can only select a previously viewed screen.")
	//}	
}
//=========================================================================================
