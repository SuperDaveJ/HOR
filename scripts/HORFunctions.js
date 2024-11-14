// JavaScript Document
// This file contains general functions to make a Web-Based Training course SCORM compliant.
// It covers all possibilities: 508 and Normal CD versions, and 508 and Normal LMS versions.
// this file must be referenced in every page

// ---------- suspend_data format: ----------
// PreExamDone~LessonStatus~PagesViewed~audioOn~ObjectiveStatus
// PreExamDone and ObjectiveStatus may not be needed for some cousres.
// PreExamDone is a boolean variable (0 or 1) to indicate if user has gone through the pre-assessment
// LessonStatus contains lesson status for each lesson seperated by commas (,)
//	 0 = not started, 1 = incomplete, 2 = completed (viewed but not passed), 3 = passed
// PagesViewed lists all page ID that have been viewd separated by commas (,).
//   pages not viewd will not be in this list.
// audioOn is for narration audio if any.  1 = ON, 0 = OFF.
// ObjectiveStatus lists all objective IDs that have been passed seperated by commas (,). 
//   non-passed ones will not be in this list.
// ---------- end of suspend_data description -----------

//Define some global variables for the course
// verNumber = Version Number can have 4 values. Its value is determined in versionCheck.htm file.
//		1: 508 CD version,
//		2: Normal CD version,
//		3: 508 LMS version,
//		4: Normal LMS version.
// intVersion can have 2 values.
//		1: 508 versions (both CD and LMS),
//		2: Normal versions (both CD and LMS),
// important NOTE:
// verNumber is used for all versions.  It must be passed along from page to page in query string.
// verNumber and intVersion are NOT saved anywhere.  intVersion is determined in initializePage().
//
var verNumber;
var intVersion;
var audioOn = 1;
//first time in the course? default to TRUE since it is always true for CD versions.
var blnFirstTime = true;	
var PreExamDone;
// tracking Objective status -- a string contains all objectives passed
var strObjStatus = "";
//total number of lessons (can be modules, topics, or anything else) not including preassessment.
var nLesson = 4;
//Lesson status and pages viewed are stored in cmi.suspend_data variable
arrLessonStatus = new Array(nLesson);
var strPagesViewed;
//NOTE: blnLastPage must be set to TRUE in the last page of each lesson.
var blnLastPage = false;
var strCourseStatus = "";
//	closing is used to detect if the CLOSE command button is clicked
var closing = true;

/* ================= process query string ==================== */
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}
/* ================= End of process query string ==================== */

/* ============= Get Style Properties of an Element: starts ============== */
// getElementById('elemID').style.properyName does NOT work
function getElementStyle(elemID, IEStyleProp, CSSStyleProp) {
    var elem = document.getElementById(elemID);
    if (elem.currentStyle) {
        return elem.currentStyle[IEStyleProp];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(elem, "");
        return compStyle.getPropertyValue(CSSStyleProp);
    }
    return "";
}
/* ============= Get Style Properties of an Element: ends ================ */

/* ============= this block of codes are added by Tim Bugher ============= */
function goBack_1(pgURL) {
	closing = false;
	ansString = getQueryValue('CH')
  	if (verNumber > 2)  {	//LMS versions
		var strTemp = getElementStyle('Next','visibility','visibility')
		if ( strTemp == "visible" ) {
			// only if all popup pages have been viewed
			// take into account if user moves back when on last page.
			if ( blnLastPage ) {
				updateDatabase()
			} else {
				updateSuspendData()
			}
		}
  	}
	window.location = pgURL + "?ver=" + verNumber + "&CH=" + ansString
}

function goNext_1(pgURL) {
	closing = false;
	ansString = getQueryValue('CH')
	//update pages viewed data
	if (verNumber > 2) updateSuspendData()
	window.location = pgURL + "?ver=" + verNumber + "&CH=" + ansString
}
/* ============= the block of codes above are added by Tim Bugher ============= */

/* == the following 3 functions: goBack(), goNext(), doJump() are modified by Tim Bugher == */
function goBack(pgURL, CH) {
	closing = false;
	ansString = CH
  	if (verNumber > 2)  {	//LMS versions
		var strTemp = getElementStyle('Next','visibility','visibility')
		if ( strTemp == "visible" ) {
			// only if all popup pages have been viewed
			// take into account if user moves back when on last page.
			if ( blnLastPage ) {
				updateDatabase()
			} else {
				updateSuspendData()
			}
		}
  	}
	//window.location = pgURL + "?ver=" + verNumber
	window.location = pgURL + "?ver=" + verNumber + "&CH=" + ansString
}

function goNext(pgURL, CH) {
	closing = false;
	ansString = CH
	if (verNumber > 2) {
		if ( blnLastPage ) {
			updateDatabase()
		} else {
			updateSuspendData()
		}
	}
	window.location = pgURL + "?ver=" + verNumber + "&CH=" + ansString
}

function doJump(pgURL, CH) {
	closing = false;
	ansString = CH
	verNumber = getQueryValue('ver')
	//window.location = pgURL + "?ver=" + verNumber
	window.location = pgURL + "?ver=" + verNumber + "&CH=" + ansString
}

function initializePage() {
	//This function is called in onLoad event of every page in a lesson
	//It initialize some global variables.
	closing = true;
	verNumber = getQueryValue('ver')
	if ( (verNumber == 1) || (verNumber == 3) ) {
		// 508 versions
		intVersion = 1
	} else {
		// Normal versions
		intVersion = 2
	}
	if (verNumber > 2) getSuspendData()
//alert("verNumber = " + verNumber)
}

function initializeCourse() {
	//This function is called once when course start (VersionCheck.htm)
	loadPage();
	//intLMS is 0 (no LMS) or 1 (LMS) obtained from loadPage() function in SCOFunctions.js file
	if (intLMS > 0) {
		//set startTime. -- startDate is set in loadPage() function
		if (typeof(startDate) == "undefined") startDate = new Date().getTime()
		setCookie("startTime", startDate);

		var strTemp = doLMSGetValue( "cmi.suspend_data" );
		if (strTemp == "" || typeof(strTemp) == "undefined") {
			blnFirstTime = true;
			strTemp = "0~0,0,0,0~~" + audioOn + "~";
			doLMSSetValue( "cmi.suspend_data", strTemp );
			doLMSCommit();
		} else {
			blnFirstTime = false;
			strCourseStatus = doLMSGetValue("cmi.core.lesson_status");
			getSuspendData();
		}
	}
}

function toMenu(blnCloseWin) {
	//This function is called when MainMenu is clicked on every page in a lesson.
	closing = false;
	if (verNumber > 2) {
		//update pages viewed data
		var strTemp = getElementStyle('Next','visibility','visibility')
		if ( strTemp != "hidden" ) {
			// only if all popup pages have been viewed
			if ( blnLastPage ) {
				updateDatabase()
			} else {
				updateSuspendData()
			}
		}
	}
}

function exitCourse(ExitBtnClicked) {
	//call this function to release the API in use
	if (ExitBtnClicked) closing = false		//avoid call this function twice
	if (verNumber > 2) {
		//get session time, save data, and exit SCO
		//startDate is the variable name used in unloadPage() function.
		startDate = getCookie("startTime");
		if (typeof(startDate) == "undefined") startDate = 0
		updateDatabase();
		unloadPage();
	}
	window.close();
}

function getLesson() {
	//this function return a Lesson name, i.e., Lesson2
	//This assumes the course structured as: course root/lesson#/HTML files for the lesson.
	//If the structure is different from the above, the code need to be changed.
	arrTemp = new Array();
	arrTemp = window.location.href.split("/");
	return arrTemp[arrTemp.length-2];
}

function getLessonStatus(iLes)
{	//iLes = lesson number
	//This function does not work properly
	getSuspendData();
	return arrLessonStatus[iLes-1];
}

function setLessonStatus(iLes)
{	//this function is called from preassessment and self-check questions
	//iLes = lesson number
	if (getLessonStatus(iLes) != 3)
	{	//for this course there is a single module (1), we make a variable here for future use
		var iMod = 1;
		var iStartPosition = 0;
		var intObjPassed = 0;
		var iFound = 0;
		iFound = strObjStatus.indexOf(","+iMod+iLes,iStartPosition);
		while (iFound != -1)
		{	intObjPassed += 1;
			iStartPosition += 4;
			iFound = strObjStatus.indexOf(","+iMod+iLes,iStartPosition);
		}
		if (intObjPassed == arrLessonObjectives[iLes-1])
			arrLessonStatus[iLes-1] = 3	 // passed all objectives
		updateSuspendData();
	}
}

function getPage() {
	//return the page file name without extension in upcase. ie., 11010
	arrTemp = new Array();
	arrTemp2 = new Array();
	arrTemp = window.location.href.split("/");
	//get rid of query string (characters after ?)
	arrTemp2 = arrTemp[arrTemp.length-1].split("?");
	//For some unknown reason, sometimes arrTemp2[0] has a "~" at the end
	//We need to get rid of it.
	var strTemp = arrTemp2[0];
	//Make sure the file extension is ".htm" or ".html" for all files
	var intTemp = strTemp.indexOf(".htm");
	strTemp = strTemp.substring(0,intTemp);
	return strTemp.toLowerCase();
}

function isPageViewed(pageFile) {
	//Get rid of the file extension if exists
	pageFile = pageFile.toLowerCase()
	var intTemp = pageFile.indexOf(".htm")
	if (intTemp != -1) pageFile = pageFile.substring(0,intTemp)
	//If the lesson is completed or passed, page must be viewed
	var strTemp = getLesson();
	var iLes = parseInt(strTemp.charAt(strTemp.length-1));
	if (iLes > 0) {
		if (arrLessonStatus[iLes-1] >= 2) return true
	}
	if (typeof(strPagesViewed) == "undefined") return false
	if (strPagesViewed.indexOf(pageFile) >= 0) return true
	else return false
}

function updateSuspendData() {
	//this function updates "cmi.suspend_data" variable only
   	if ((strPagesViewed == "") || (typeof(strPagesViewed) == "undefined")) {
		strPagesViewed = ""
	}
	var strTemp = getLesson();
	var iLes = parseInt(strTemp.charAt(strTemp.length-1));
	if ( (strPagesViewed.indexOf(getPage()) == -1) && (arrLessonStatus[iLes-1] < 2) ) {
		strPagesViewed = strPagesViewed + "," + getPage();
	}
	if (arrLessonStatus[iLes-1] < 2) arrLessonStatus[iLes-1] = 1
	strTemp = arrLessonStatus.join();
	strTemp = PreExamDone + "~" + strTemp + "~" + strPagesViewed + "~" + audioOn + "~" + strObjStatus;
	doLMSSetValue("cmi.suspend_data", strTemp);
	doLMSCommit();
}

function getSuspendData() {
	//get lessonStatus, pagesViewed, and audioOn, etc.
	var strTemp = doLMSGetValue( "cmi.suspend_data" );
	if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
		arrTemp = new Array();
		arrTemp = strTemp.split("~");
		PreExamDone = arrTemp[0]
		var strTemp = arrTemp[1];
		for (i=0; i<nLesson; i++) {
			arrLessonStatus[i] = parseInt(strTemp.charAt(2*i));
		}
		strPagesViewed = arrTemp[2];
		strAudio = arrTemp[3]
		if ( (strAudio != "") && (typeof(strAudio) != "undefined") )
			audioOn = parseInt(strAudio)
		else
			audioOn = 0
		// get objective status data
		strObjStatus = arrTemp[4];
	}
}

function cleanSuspendData() {
	//When a lesson is completed we don't need to keep the pagesViewed in the
	//suspendData.  We need to remove them.
	//The code needs to be changed for each course based on the file name composition.
	var re = /,,/g;
	var strTemp = strPagesViewed.toLowerCase();
	for (var i=0; i<nLesson; i++) {
		if (arrLessonStatus[i] >= 2) {
			//do clean up.  The code is for NRC IR course only.
			//Page files are named in the format: Mod number (1 digit) Lesson number (1 digit) Page number (3 digits)
			//for example 12030 for module 1 lesson 2 page 3.
			//This SCO is module 1.  So specify it here.
			var strMod = "1"
			var str1 = strMod.toString() + (i+1).toString();
			arrTemp = new Array();
			arrTemp = strTemp.split(",")
			for (var j=0; j<arrTemp.length; j++) {
				//check for first 2 digits.
				if (arrTemp[j].substr(0,2) == str1) arrTemp[j] = ""
			}
			strTemp = arrTemp.join();
			while (strTemp.indexOf(",,") != -1) {
				str2 = strTemp.replace(re,",");
				strTemp = str2;
			}
		}
	}
	//after cleaned
	strPagesViewed = strTemp;
}


function updateDatabase() {
	//There are 4 lessons for this course. We need to keep each lesson completion status
	//We also need to keep pages viewed records, and course version selected.
	//All these data will be saved in the cmi.suspend_data variable of the LMS.
	//The data stored in "cmi.suspend_data" has the following format
	//PreExamDone~LessonStatus~PagesViewed~audioOn~ObjectiveStatus
	//Both lessonStatus and pagesViewed contains "," separated values.
	var pageLocation;
	getSuspendData();
	var strTemp = getLesson();
	var iLes = parseInt(strTemp.charAt(strTemp.length-1));
	if (blnLastPage) {
		pageLocation = "";
		if (arrLessonStatus[iLes-1] < 2) arrLessonStatus[iLes-1] = 2
		//remove all page names from suspendData when a lesson is completed.
		cleanSuspendData();
		//check to see if all lessons are completed
		var nCompleted = 0;
		var nPassed = 0;
		for (var i=0; i<nLesson; i++) {
			if (arrLessonStatus[i] == 2) nCompleted += 1
			if (arrLessonStatus[i] == 3) nPassed += 1
		}
		if (nPassed == nLesson)
			doLMSSetValue("cmi.core.lesson_status", "passed")
		else if (nCompleted == nLesson)
			doLMSSetValue("cmi.core.lesson_status", "completed")
		else
			doLMSSetValue("cmi.core.lesson_status", "incomplete")
	} else {
			pageLocation = getLesson() + "/" + getPage() + ".htm";
			if (arrLessonStatus[iLes-1] < 2) arrLessonStatus[iLes-1] = 1
	}
	doLMSSetValue("cmi.core.lesson_location", pageLocation);
	doLMSCommit();
	updateSuspendData();
}

function popConfirm(){
	if ( intVersion == 2 ) { // Normal version
		MM_showHideLayers('ExitConfirm','','show')
		document.all["ExitConfirm"].innerHTML = getConfirmBox();
	} else {	// 508 version
		if (confirm("Do you wish to exit the course?")==true) exitCourse(true);
	}
}

/* ----------------- Cookie Functions begin -------------------------- */
function setCookie(name, value, expire){
	document.cookie = name + "=" + escape(value) + ((expire == null)?"":("; expires =" + expire.toGMTString()))
}

function getCookie(Name) {
	var Mysearch = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(Mysearch);
		if (offset != -1){
			offset += Mysearch.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
}

function deleteCookie (name) { 
	var exp = new Date();  
	exp.setTime (exp.getTime() - 10);  
	var cookieValue = getCookie (name);  
	document.cookie = name + "=" + cookieValue + "; expires=" + exp.toGMTString();
}
/* ----------------- Cookie Functions end -------------------------- */
