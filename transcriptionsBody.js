// transcriptionsBody.js

/*
    @function replaceAll: replace all instances of find with replace in str
    @param find
    @param replace
    @param str
*/
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var list = document.getElementById("transcriptionlist");


// Get the song list from the file list.txt
var xmlhttp;

/* running locally on IE5.5, IE6, IE7 */
//@cc_on
if(location.protocol=="file:"){
if(!xmlhttp)try{ xmlhttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlhttp=false;}
if(!xmlhttp)try{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlhttp=false;}
}
//@cc_off @*/

/* IE7, Firefox, Safari, Opera...  */
if (!xmlhttp) try { xmlhttp = new XMLHttpRequest(); } catch (e) { xmlhttp = false; }
/* IE6 */
if (typeof ActiveXObject != "undefined") {
    if (!xmlhttp) try { xmlhttp = new ActiveXObject("MSXML2.XMLHTTP"); } catch (e) { xmlhttp = false; }
    if (!xmlhttp) try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { xmlhttp = false; }
}
/* IceBrowser */
if (!xmlhttp) try { xmlhttp = createRequest(); } catch (e) { xmlhttp = false; }

xmlhttp.open("GET", "list.txt", true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {
    var SongList, SongListLength, i, splitLine, Line, song, songname;

    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

        // Split response into lines.
        SongList = xmlhttp.responseText.split(/\n/);

        /* 
        Result list should contain strings in the format
        
        Artist\Artist_Title.pdf

        Any marked _private are ignored.
        Show lines as "Artist : Title"; replace "_" with " " and remove ".pdf".

        */
        SongListLength = SongList.length;
        for (i = 0; i < SongListLength; i++) {
            if (SongList[i].length === 0) {
                continue;
            }
            splitLine = SongList[i].split(/Scores\\/);
            if (splitLine.length != 2) {
                continue;
            }
            if (splitLine[1].search("_private") != -1) {
                continue;
            }

            Line = splitLine[1];
            // remove \r from line feeds
            Line = Line.replace("\r", "");
            Line = replaceAll("_", " ", Line);
            Line = Line.split(/\\/);
            if (Line.length == 2) {
                songname = Line[1].replace(Line[0], "");
                songname = songname.replace(".pdf", "");
                song = Line[0].trim() + " : " + songname.trim();
                list.appendChild(document.createTextNode(song));
                list.appendChild(document.createElement("br"));
            }
        }
    }
    else {
        //list.appendChild(document.createTextNode("Unable to process list"));
    }
}
xmlhttp.send();


