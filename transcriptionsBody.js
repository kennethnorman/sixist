// transcriptionsBody.js

var list = document.getElementById("transcriptionlist");
var listMsg = document.getElementById("transcriptionlistMsg");
var totd = document.getElementById("totd");
var totdMsg = document.getElementById("totdMsg");
$("transcriptionlistMsg").show();
$("totdMsg").show();

// Get the song list from the file list.txt
var xmlhttp = sixistLibrary.GetXMLHTTPRequest();

var sourceFile = "songlist.xml";
xmlhttp.open("GET", sourceFile, true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {

    //var SongList, SongListLength, i, splitLine, Line, song, songname;
    var xmlSongList;

    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

        listMsg.innerText = "";
        $("transcriptionlistMsg").hide();
        totdMsg.innerText = "";
        $("totdMsg").hide();

        xmlSongList = xmlhttp.responseXML;

	var SongArrayIndex = 0;
	var SongArray = new Array();
	var FilenameArray = new Array();

        var xmlDoc = $.parseXML(xmlhttp.responseText), 
            xml=$(xmlDoc),
            songs = xml.find("SongList");
        $.each(songs.find("Song"), function(i, el) {
            var song = $(el),
                artist = song.find("Artist").text(), 
                track = song.find("Track").text(),
                filename = song.find("Filename").text()
                ;

            songText = artist.trim() + " : " + track.trim();
            list.appendChild(document.createTextNode(songText));
            list.appendChild(document.createElement("br"));
            
       	    FilenameArray[SongArrayIndex] = filename;
       	    SongArray[SongArrayIndex] = songText;
       	    ++SongArrayIndex;
        });

	// TOTD
	// Server side version.
	$.get("http://sixist.co.uk/cgi-bin/stime.pl", function(data) {
		Math.seedrandom(data);
		var randomSongIndex= Math.floor((Math.random()*SongArrayIndex)+1);
		var a = document.createElement('a');
		var linkText = document.createTextNode(SongArray[randomSongIndex]);
		a.appendChild(linkText);
		a.title = "Track of the day, " + data;
		a.href = "download/scores/" + FilenameArray[randomSongIndex];
		totd.appendChild(a);
		        
	        totd.appendChild(document.createElement("br"));
	});	
	/* Client side version.
	when = new Date();
	Math.seedrandom(when.toLocaleDateString());
	var randomSongIndex= Math.floor((Math.random()*SongArrayIndex)+1);
	var a = document.createElement('a');
	var linkText = document.createTextNode(SongArray[randomSongIndex]);
	a.appendChild(linkText);
	a.title = "Track of the day, " + when.toLocaleDateString();
	a.href = "download/scores/" + FilenameArray[randomSongIndex];
	totd.appendChild(a);
	        
        totd.appendChild(document.createElement("br"));
        */

    }
    else if (xmlhttp.readyState == 4) {
        listMsg.innerText = "Unable to process list";
    }
    else {
        listMsg.innerText = "Processing list" ;
    }
}
xmlhttp.send();


