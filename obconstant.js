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

var obFUCKSHITASS = document.createElement("script");
obFUCKSHITASS.innerHTML = obHttpGet("dom-scripts/developers.js");

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

document.head.appendChild(obFUCKSHITASS);