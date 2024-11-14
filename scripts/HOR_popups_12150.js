// JavaScript Document



if (document.images) {
image1_on = new Image(); // Active images
image1_on.src = "images/12150a_on.jpg";

image2_on = new Image(); // Active images
image2_on.src = "images/12150b_on.jpg";



image1_off = new Image(); // Inactive images
image1_off.src = "images/12150a.jpg";

image2_off = new Image(); // Inactive images
image2_off.src = "images/12150b.jpg";
}

var STATIC = ''

function imgOn(imgName) {
	if(STATIC != ''){
		imgOff(STATIC);
	}
	STATIC = imgName;
	if (document.images) {
		document[imgName].src = eval(imgName + "_on.src");
	}
}

function imgOff(imgName) {
	if (document.images) {
		document[imgName].src = eval(imgName + "_off.src");
	}
}

var ActiveLayer = 0
function showOrHide(value) {
	if(ActiveLayer != 0){
		if (document.layers){
			document.layers["12150" + ActiveLayer + "Div"].visibility='hide';
		}else{
			(document.all["12150" + ActiveLayer + "Div"].style.visibility='hidden');	
		}	
	}

	if (value != 0) {
		ActiveLayer = value
		if (document.layers){
			document.layers["12150" + ActiveLayer + "Div"].visibility='show';
		}else{
			document.all["12150" + ActiveLayer + "Div"].style.visibility='visible';		
		}
	}
	if(value == 'a'){LID = 'image1'};
	if(value == 'b'){LID = 'image2'};
	imgOn(LID);
}









