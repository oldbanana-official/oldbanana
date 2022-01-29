function obHttpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
  	obReportInfo("Sending GET request to " + url);
    return xmlHttp.responseText;
}

function obReportInfo(string) {
	window.console.info("[OldBanana] " + string);
}

function obAddStaffIcons() {
// are these names overkill?
var obDeveloperIconsSheetBuffer = "/*Adds indicators to avatars of every Oldbanana developer*/\n"; //hold entire css until completed
var obDeveloperIconsSelectorBuffer = ""; //use to calculate result per user
var obDeveloperIconsData = JSON.parse(obHttpGet("https://oldbanana-official.github.io/auto-web-content/developers.json")); //get actual json data from server
var obDeveloperIconsDataIndex = 0; //count where we are in the json array

while(obDeveloperIconsData.users.length > obDeveloperIconsDataIndex) {
	if(obDeveloperIconsSheetBuffer.endsWith("::before")) {
		obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat(",\n");
	}
	
	if(obDeveloperIconsData.users[obDeveloperIconsDataIndex].role == "developer") {
	obDeveloperIconsSelectorBuffer = ".Avatar[href=\"https://gamebanana.com/members/"; //initialize the variable
	obDeveloperIconsSelectorBuffer = obDeveloperIconsSelectorBuffer.concat(obDeveloperIconsData.users[obDeveloperIconsDataIndex].id.toString());
	obDeveloperIconsSelectorBuffer = obDeveloperIconsSelectorBuffer.concat("\"]::before");
	}
	
	obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat(obDeveloperIconsSelectorBuffer); //save our results to the buffer
	
	obDeveloperIconsDataIndex++;
}

obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat("\n{content: url(https://images.gamebanana.com/img/flags/studios/61a197d40641e.png);width: 20px;height: 10px;position: absolute;bottom: -3px;right: -3px;filter: drop-shadow(0 0 2px black) drop-shadow(0 0 2px black);}\n\n");

obDeveloperIconsDataIndex = 0;

while(obDeveloperIconsData.users.length > obDeveloperIconsDataIndex) {
	if(obDeveloperIconsSheetBuffer.endsWith("::before")) {
		obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat(",\n");
	}
	
	if(obDeveloperIconsData.users[obDeveloperIconsDataIndex].role == "developer") {
	obDeveloperIconsSelectorBuffer = ".Avatar[href=\"https://gamebanana.com/members/"; //initialize the variable
	obDeveloperIconsSelectorBuffer = obDeveloperIconsSelectorBuffer.concat(obDeveloperIconsData.users[obDeveloperIconsDataIndex].id.toString());
	obDeveloperIconsSelectorBuffer = obDeveloperIconsSelectorBuffer.concat("\"].Online::before");
	}
	
	obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat(obDeveloperIconsSelectorBuffer); //save our results to the buffer
	
	obDeveloperIconsDataIndex++;
}

obDeveloperIconsSheetBuffer = obDeveloperIconsSheetBuffer.concat("\n{content: url(https://images.gamebanana.com/img/flags/studios/61a197d40641e.png);width: 20px;height: 10px;position: absolute;bottom: -3px;right: 10px;filter: drop-shadow(0 0 2px black) drop-shadow(0 0 2px black);}");


var obDeveloperIconsSheet = document.createElement("style");
obDeveloperIconsSheet.innerHTML = obDeveloperIconsSheetBuffer;
document.head.appendChild(obDeveloperIconsSheet);
//todo: donors and testers
}

obAddStaffIcons();