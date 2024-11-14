// JavaScript Document



if (document.images) {
image1_on = new Image(); // Active images
image1_on.src = "images/12130a_on.jpg";

image2_on = new Image(); // Active images
image2_on.src = "images/12130b_on.jpg";

image3_on = new Image(); // Active images
image3_on.src = "images/12130c_on.jpg";

image4_on = new Image(); // Active images
image4_on.src = "images/12130d_on.jpg";



image1_off = new Image(); // Inactive images
image1_off.src = "images/12130a.jpg";

image2_off = new Image(); // Inactive images
image2_off.src = "images/12130b.jpg";

image3_off = new Image(); // Inactive images
image3_off.src = "images/12130c.jpg";

image4_off = new Image(); // Inactive images
image4_off.src = "images/12130d.jpg";
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
			document.layers["12130" + ActiveLayer + "Div"].visibility='hide';
		}else{
			(document.all["12130" + ActiveLayer + "Div"].style.visibility='hidden');	
		}	
	}

	if (value != 0) {
		ActiveLayer = value
		if (document.layers){
			document.layers["12130" + ActiveLayer + "Div"].visibility='show';
		}else{
			document.all["12130" + ActiveLayer + "Div"].style.visibility='visible';		
		}
	}
	if(value == 'a'){LID = 'image1'};
	if(value == 'b'){LID = 'image2'};
	if(value == 'c'){LID = 'image3'};
	if(value == 'd'){LID = 'image4'};
	imgOn(LID);
}









