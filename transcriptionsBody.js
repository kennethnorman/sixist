var list = document.getElementById("transcriptionlist");
/*
for (var element in transcriptionList) {
    //alert(transcriptionList[element].title);

    if (list != "undefined") {
        var formatEntry = transcriptionList[element].artist + " : " + transcriptionList[element].title;
        list.appendChild(document.createTextNode(formatEntry));
        list.appendChild(document.createElement("br"));
    }
}*/

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

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {
        var SongList = xmlhttp.responseText.split(/\r\n/);
        var SongListLength = SongList.length;
        for (var i = 0; i < SongListLength; i++) {
            var Line = SongList[i].split(/\\/);
            var song;
            if (Line.length == 2) {
                var songname= Line[1].replace(Line[0], "");
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


