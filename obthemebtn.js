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
		
function obInstallTheme(e) {
if (e.target.id == "InstallObThemeButton") {
  browser.runtime.sendMessage({"obInstallThemeAt": obCurrentSubmissionURL.replace("scripts/", "scripts/raw/")});
  }
	obReportInfo("installer triggered");
}

var obCurrentSubmissionURL = window.location.toString().replace("https://", "").replace("http://", "");
var obCurrentSubmissionAPIOutput = null;

if(obCurrentSubmissionURL.startsWith("gamebanana.com/scripts")){
  obReportInfo("This page contains a Script submission! Checking for UI Theme...");
  obCurrentSubmissionAPIOutput = JSON.parse(obHttpGet("https://" + (obCurrentSubmissionURL.replace("scripts", "apiv3/Script"))));
  window.console.info(obCurrentSubmissionAPIOutput);
  
  if(obCurrentSubmissionAPIOutput._aCategory._sName == "UI Themes"){
    var obThemeInstallerStyles = document.createElement("style");
obThemeInstallerStyles.innerHTML = "spriteIcon.SubmissionTypeSmall.oldbanana,.SpriteIcon.SubmissionTypeSmall.oldbanana {background:url(\"https://files.gamebanana.com/bitpit/obico2.png\");background-position: auto;background-size:28px auto;background-repeat:no-repeat;width:28px;image-rendering:auto !important;}";
		document.getElementsByTagName("head")[0].appendChild(obThemeInstallerStyles);
		var lineBreak = document.createElement("br");
		var themeImportButton = document.createElement("button");
		themeImportButton.appendChild(document.createElement("spriteicon"));
		var sAN0 = document.createAttribute("class");
		sAN0.value = "IconButton";
		var sAN1 = document.createAttribute("id");
		sAN1.value = "InstallObThemeButton";
		var sAN2 = document.createAttribute("type");
		sAN2.value = "button";
		themeImportButton.setAttributeNode(sAN0);
		themeImportButton.setAttributeNode(sAN1);
		themeImportButton.setAttributeNode(sAN2);
		var sAN3 = document.createAttribute("class");
		sAN3.value = "SubmissionTypeSmall oldbanana";
		themeImportButton.children[0].setAttributeNode(sAN3);
		var sAN4 = document.createAttribute("style");
		sAN4.value = "margin-top:5px;";
		themeImportButton.setAttributeNode(sAN4);
		var aC0 = document.createElement("span");
		aC0.innerHTML="Install Theme Locally";
		themeImportButton.appendChild(aC0);
		
		themeImportButton.addEventListener("click", obInstallTheme);
		document.getElementById("UiThemeInstallerModule").children[0].appendChild(lineBreak);
		document.getElementById("UiThemeInstallerModule").children[0].appendChild(themeImportButton);
		
		/*var obThemeEventHandlerScript = document.createElement("script");
		obThemeEventHandlerScript.textContent = "document.getElementById(\"InstallObThemeButton\").addEventListener(\"click\", obInstallTheme);window.console.info(\"haha\");";
		document.head.appendChild(obThemeEventHandlerScript);*/
		
  		obReportInfo("Added script install event listener");
  } else {
  	obReportInfo("found script, but no UI theme. ignoring UI injection");
  }
} else {
  	obReportInfo("didn't find script, ignoring UI injection");
}
