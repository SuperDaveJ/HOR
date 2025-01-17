var popupLinkConfig = new Array;

//Javascript popup class 

// popupLinkConfig["classname"] = new Array ( "targetname", "width=550,height=350,scrollbars=yes,resizable=yes,status=yes,toolbar=yes,location=yes,menubar=yes");

// Config files

popupLinkConfig["popup"] = new Array ( "", "width=350,height=450,scrollbar=yes,menubar=yes");
popupLinkConfig["newWindow"] = new Array ( "help", "width=1019,height=669,resizable=no,scrollbars=no");

// ==========================================================================

window.onload = initPage;  
// Note: Make sure that no other javscripts assign a fuction to window.onload
// There can be only one function tied to window.onload at a time.

function initPage() {
  initPopupLinks();
  // place here any other code you wish to run when the page loads.
}

function initPopupLinks()
{
  if (!document.getElementsByTagName) return true;
  var pageLinks = document.getElementsByTagName("a");
  for (var i = 0; i < pageLinks.length; i++) 
  {
    if (((pageLinks[i].className != null) && 
         (pageLinks[i].className != "")) ||
        ((pageLinks[i].parentNode.className != null) && 
         (pageLinks[i].parentNode.className != "")))
    {
      var linkClass = " " + pageLinks[i].className + " ";
      if ((linkClass == "  ") && (pageLinks[i].parentNode.className != ""))
      {
        linkClass = " " + pageLinks[i].parentNode.className + " ";
      }
      for (var theKey in popupLinkConfig) 
      {
        if (linkClass.indexOf(" " + theKey + " ") > -1)
        {
          if ((pageLinks[i].target == "") || (pageLinks[i].target == null))
          {
            pageLinks[i].target = (popupLinkConfig[theKey][0] != "") ? popupLinkConfig[theKey][0] : theKey;
          }
          pageLinks[i].settings = popupLinkConfig[theKey][1];
          pageLinks[i].onclick = popUp;
        }
      }
    }
  }
  return true;
}

function popUp()
{
  newWin = window.open(this.href, this.target, this.settings);
  newWin.focus();
  return false;
}
/*
*	FUNCTION: launchResource
*/
function launchMainwindow(URL, xSize, ySize){
	popupWin= window.open(URL,"Popup","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,scrollbars=no,left=50,top=100,width=1020,height=680");
	window.close();
}
