/*
*	FUNCTIONS.js:	Includes functions for navigation, progress, and other scripting
*/
//window.onerror = function() { return true; }
//page variables
	var currentLesson; // holds the name of the current lesson for the module map
	var currentPage; // holds the name of this page for navigation and page counting
// page variables
/*
*	FUNCTION: goNext
*/
function goNext(currentPage){
	for(i=1;i<currentLesson.length;i++){
		if(currentPage == currentLesson[i]){
			if(i == (currentLesson.length-1)){
				location.href="../index.html";
			}else{
				//goto the next page in the array found in lessonX.js
				location.href=currentLesson[i+1];
				i = currentLesson.length;
			}
		}
	}
}
/*
*	FUNCTION: goBack
*/
function goBack(currentPage){
	for(i=1;i<currentLesson.length;i++){
		if(currentPage == currentLesson[i]){
			if(i == 1){
				location.href="../index.html";
			}else{
				//goto the previous page in the array found in lessonX.js
				location.href=currentLesson[i-1];
				i = currentLesson.length;
			}
		}
	}
}

function popConfirm(){
	if ( intVersion == 2 ) { // Normal version
		MM_showHideLayers('ExitConfirm','','show')
		document.all["ExitConfirm"].innerHTML = getConfirmBox();
	} else {	// 508 version
		if (confirm("Do you wish to exit the course?")==true) exitCourse(true);
	}
}
function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
   var arVersion = navigator.appVersion.split("MSIE")
   var version = parseFloat(arVersion[1])
   if ((version >= 5.5) && (document.body.filters)) 
   {
      for(var i=0; i<document.images.length; i++)
      {
         var img = document.images[i]
         var imgName = img.src.toUpperCase()
         if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
         {
            var imgID = (img.id) ? "id='" + img.id + "' " : ""
            var imgClass = (img.className) ? "class='" + img.className + "' " : ""
            var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
            var imgStyle = "display:inline-block;" + img.style.cssText 
            if (img.align == "left") imgStyle = "float:left;" + imgStyle
            if (img.align == "right") imgStyle = "float:right;" + imgStyle
            if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
            var strNewHTML = "<span " + imgID + imgClass + imgTitle
            + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
            + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
            + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
            img.outerHTML = strNewHTML
            i = i-1
         }
      }
   }    
}
window.attachEvent("onload", correctPNG);


/*
*	FUNCTION: getPageName
*/
function getPageName() {
	var thisPage = window.document.location.toString();
	var tempArray = thisPage.split("/");
	currentPage = tempArray[tempArray.length - 1];
	currentLesson = eval(tempArray[tempArray.length -2]);
}

/*
*	FUNCTION: changeInnerText
*/
function changeInnerText(theElement,newText) {
	theElement.innerText = newText;
}
/*
*	FUNCTION: launchPopUp
*/
function launchPopUp(passedText){
	popupWin= window.open("","Popup","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,left=50,top=100,width=230,height=200");
	var frameString="";
  	frameString="<html><head><title>FS21 Prerequisite Training Course - Did You Know?</title>"+
	"<style type='text/css'>"+
	"<!--"+
	".style1 {font-family: Arial, Helvetica, sans-serif;font-size:14}"+
	"-->"+
	"</style>"+
	"</head><body bgcolor='#EBF5FE'><div id='title' style='position:absolute;width:208px; height:100; top:63px; left:6px'><p class='style1'>"+passedText+"</p>"+
	"</div><div id='icon' style='position:absolute;width:208px; height:59px; top:3px; left:6px'><strong><img src='../images/Icon_dyk.jpg' alt='Did You Know?' width='81' height='56' align='right'><span class='style1'>Did You Know...?</span></strong></div>"+
	"</body></html>";
 	popupWin.document.write(frameString);
	popupWin.document.close();
}
/*
*	FUNCTION: launchHelp
*/
function launchHelp(URL, xSize, ySize){
	popupWin= window.open(URL,"Help","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,scrollbars=yes,left=50,top=100,width=1020,height=650");
}
/*
*	FUNCTION: launchHelp
*/
function launchHelp1(URL){
	popupWin= window.open(URL,"Help","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,scrollbars=yes,left=50,top=100,width=1020,height=650");
}

/*
*	FUNCTION: popReadable
*/
function popReadable(URL, xSize, ySize){
	popupWin= window.open(URL,"Popup","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,scrollbars=yes,left=50,top=100,width=" + xSize + ",height=" + ySize);
  var frameString=""+
	"<html>"+
	"<head>"+
	"<title>"+ "FS21 Prerequisite Training Course – More Information" +"</title>"+
	"<body>" + "<img src=" + URL + ">"+ "</body>" +
	"</head>"+
	"</html>"
  popupWin.document.open();
  popupWin.document.write(frameString);
  popupWin.document.close();
}

/*
*	FUNCTION: launchResource
*/
function launchResource(URL, xSize, ySize){
	popupWin= window.open(URL,"Popup","toolbar=yes,location=no,directories=no,status=no,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,left=50,top=100,width=740,height=450");
}

/*
*	FUNCTION: launchResource

function launchTextOnly(URL, xSize, ySize){
	popupWin= window.open(URL,"Textonly","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,left=50,top=100,width=1020,height=720");
}*/
/*
*	FUNCTION: launchResource
*/
function launchTextOnly1(URL){
	popupWin= window.open(URL,"Textonly","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,left=50,top=100,width=1020,height=720");
}

/*
*	FUNCTION: showhide
*/
function showhide(mode,divID) {
	if(mode == 'hide'){
		if(document.layers){
			document.layers[divID].visibility="hide";
		}else{
			document.getElementById(divID).style.visibility="hidden";
		}
	}else{
		if(document.layers){
			document.layers[divID].visibility="show";
		}else{
			document.getElementById(divID).style.visibility="visible";
		}
	}
}
/*
*	FUNCTIONS: MM_X  DO NOT EDIT
*/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
