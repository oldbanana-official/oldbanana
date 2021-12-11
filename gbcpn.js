/*
*   Oldbanana - The Gamebanana Enhancement Project, for Firefox
*   Copyright (C) 2021  bonkmaykr
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*var gbcpnVersionString = "1.0";
window.console.info("[GBCPN] Gamebanana Custom Primary Nav, by bonkmaykr");
window.console.info("[GBCPN] version " + gbcpnVersionString);*/

var obNumberOfInvoluntaryNavReloads = 0;

function htmlToElement(html) { // thanks stackexchange - https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function obReportInfo(string) {
	window.console.info("[OldBanana] " + string);
}

function obReportWarning(string) {
	window.console.warn("[OldBanana] " + string);
}

var cpn_observer = new MutationObserver(function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      obLoadCPN();
    }
  }
});

var primaryNavTarget = document.querySelector("nav#PrimaryNav");
primaryNavTarget.innerHTML= "<div style=\"width:100%;height:100%;\"><span style=\"text-align:center;margin:auto;\">Waiting for Gamebanana's default nav to load before injecting...</span></div>";

cpn_observer.observe(primaryNavTarget, {
          characterData: false,
          childList: true,
          attributes: false,
          subtree: false
        });

function obLoadCPN() {

// check to see if OldBanana was the one that triggered this change or not. 
// if not, rebuild the nav.
if(document.querySelectorAll("#obNavIdentifier_DONOTMODIFY_DONOTCOPY_DONOTINTERFERE")[0] == null || document.querySelectorAll("#obNavIdentifier_DONOTMODIFY_DONOTCOPY_DONOTINTERFERE")[0].parentElement != primaryNavTarget){
obNumberOfInvoluntaryNavReloads++;
if (obNumberOfInvoluntaryNavReloads <= 0) {
	obReportInfo("Original Nav Loaded, let's get ready to rock!");
	obReportInfo("loading custom nav");
} else {
	obReportWarning("The custom nav had to be reloaded because something interfered with it. It's possible Gamebanana is still trying to load it's own nav on top. The custom nav will need to be rebuilt.");
	obReportInfo("reloading custom nav");
}

// delete the contents of the original nav
document.getElementById("PrimaryNav").innerHTML = "";
obReportInfo("Deleted existing PrimaryNav, commencing reconstruction...");

// reconstruct the nav, easy stuff first

// create a new tag that will tell Oldbanana not to overwrite itself
var obNavTag = document.createElement("obNavTag");
obNavTag.id = "obNavIdentifier_DONOTMODIFY_DONOTCOPY_DONOTINTERFERE";
obNavTag.style = "display:none;pointer-events:none;";
primaryNavTarget.appendChild(obNavTag);

// use the original site logo for compatibility with updated ubers. there's no need to revert it
var gbcpnSiteLogo = htmlToElement("<a id=\"SiteLogo\" href=\"/\"><spriteicon class=\"NavModuleIcon BananaNavModuleIcon\"></spriteicon><img src=\"https://images.gamebanana.com/static/img/logo.png\" alt=\"Logo\"></a>");
obReportInfo("rebuilt site logo");
//primaryNavTarget.appendChild(gbcpnSiteLogo); // this causes a border-left where there shouldn't be one
document.querySelector("#obNavIdentifier_DONOTMODIFY_DONOTCOPY_DONOTINTERFERE").before(gbcpnSiteLogo);

// games list
var gbcpnGames = htmlToElement("<div class=\"NavGames\"><span>Games module coming soon</span></div>");
primaryNavTarget.appendChild(gbcpnGames);

// search bars, old and new
var gbcpnOldSearch = htmlToElement("");
var gbcpnNewSearch = htmlToElement("<form class=\"SiteSearch\" id=\"SearchForm\"><div class=\"InputWithButton\"><input type=\"text\" name=\"query\" autocomplete=\"off\" placeholder=\"Search...\" aria-expanded=\"false\"><button type=\"submit\"><spriteicon class=\"MiscIcon SearchIcon\"></spriteicon></button></div></form>");
obReportInfo("rebuilt search bars");
// todo ADD SEARCH URL CODE
primaryNavTarget.appendChild(gbcpnNewSearch);
}
}
