// counter.js

// Counter
var counter = document.getElementById("counter");
$("counter").hide();
counter.innerText = "";

// Get the data from the file
var xmlhttp = sixistLibrary.GetXMLHTTPRequest();

var sourceFile = "counter.xml";
xmlhttp.open("GET", sourceFile, true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {

     if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

		var xmlDoc = $.parseXML(xmlhttp.responseText), 
			xml=$(xmlDoc),
			counts = xml.find("Counters");
		
		$.each(counts.find("sixist"), function(i, el) {
			var count = $(el);
			if (count.length > 0) {
				counter.innerText = count[0].textContent;
			}
		});

		// Counter

		// Update Server data.
		var hostname= "www.sixist.co.uk";
		if (window.location.hostname) {
			hostname= window.location.hostname;
		}
	
		var updateurl= "http://" + hostname + "/cgi-bin/counter.pl?name=sixist";
		$.ajax({
		  url: updateurl,
		  success: function() {
		  cache: false
		  },
		  error: function(xmlhttp, textStatus, errorThrown) { 
			if (xmlhttp.status == 0) {
			  alert('Check Your Network.');
			} else if (xmlhttp.status == 404) {
			  alert('Requested URL not found.');
			} else if (xmlhttp.status == 500) {
			  alert('Internal Server Error.');
			}  else {
			   alert('Unknown Error.\n' + xmlhttp.responseText);
			}     
		  }
		});	
	
		$("counter").show();
	
    }
    else if (xmlhttp.readyState == 4) {
        counter.innerText = "Unable to process counter";
    }
    else {
        counter.innerText = "Fetching count" ;
    }
}
xmlhttp.send();

