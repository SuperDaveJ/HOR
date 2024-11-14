// JavaScript Document





var ActiveLayer = 0
function showOrHide(value) {
	if(ActiveLayer != 0){
		if (document.layers){
			document.layers["12180" + ActiveLayer + "Div"].visibility='hide';
		}else{
			(document.all["12180" + ActiveLayer + "Div"].style.visibility='hidden');	
		}	
	}

	if (value != 0) {
		ActiveLayer = value
		if (document.layers){
			document.layers["12180" + ActiveLayer + "Div"].visibility='show';
		}else{
			document.all["12180" + ActiveLayer + "Div"].style.visibility='visible';		
		}
	}
}









