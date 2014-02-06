// transcriptionsBody.js

var list = document.getElementById("transcriptionlist");
var listMsg = document.getElementById("transcriptionlistMsg");
$("transcriptionlistMsg").show();

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

        xmlSongList = xmlhttp.responseXML;

        var xmlDoc = $.parseXML(xmlhttp.responseText), 
            xml=$(xmlDoc),
            songs = xml.find("SongList");
        $.each(songs.find("Song"), function(i, el) {
            var song = $(el),
                artist = song.find("Artist").text(), 
                track = song.find("Track").text();

            songText = artist.trim() + " : " + track.trim();
            list.appendChild(document.createTextNode(songText));
            list.appendChild(document.createElement("br"));
        });

    }
    else if (xmlhttp.readyState == 4) {
        listMsg.innerText = "Unable to process list";
    }
    else {
        listMsg.innerText = "Processing list" ;
    }
}
xmlhttp.send();


