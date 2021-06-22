function _isIE(){

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return true;
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			return true;
		}

		return false;
}


	var docEditor;
	var divId;
	var _msgDispatcher;
	var startWarning=false;
	var displayMessage = true;

	function onPrint(){

		var browser = _isIE() ? PrintPlugin.PRINT_BROWSER.IE : PrintPlugin.PRINT_BROWSER.CHROME;
		if (/Edge\/\d./i.test(navigator.userAgent)){
			browser = PrintPlugin.PRINT_BROWSER.EDGE;
		}

		var printDiv = document.getElementById('printDiv');
		if(printDiv) {
			printDiv.innerHTML = "";
		} else {
			printDiv = document.createElement('div');
			printDiv.id = 'printDiv';
			document.body.appendChild(printDiv);
		}

		var onFinish = function(wrapperElem) {
			if (browser === PrintPlugin.PRINT_BROWSER.IE) {
				// OnlyOffice iframe will continuously try to hijack focus and IE11 will
				// end up printing the contents inside of iframe. To avoid this, we
				// disable the hijacking before printing
				//docEditor.enableFocusHijacking({'status':false});
				
				
				//setTimeout(function() {
					// print is in a timeout because the above call enableFocusHijacking
					// is an event and may take some time before it's executed
					window.focus();
					window.print();
					window.focus();
					//setTimeout(function() {
						// can't enable hijacking and clearing rendered images 
						// before print dialog is open
							//	docEditor.showProgressDiv({'type':'Print','status':false});
						//printDiv.innerHTML = "";										
					//}, 10);
					
					//setTimeout(function() {
						//docEditor.enableFocusHijacking({'status':true});		
					//}, 5000);
					
				//}, 1000);
				
			} else {
				window.focus();
				window.print();
				window.focus();							
				//printDiv.innerHTML = "";
			}
		};
		
		//docEditor.showProgressDiv({'type':'Print','status':true});
		PrintPlugin.printPDF(null, 'printDiv', browser, onFinish); 		
	}

