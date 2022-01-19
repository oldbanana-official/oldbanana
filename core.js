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

// 8=====================================================================================D

window.console.info("[OldBanana] OldBanana, by bonkmaykr");

window.console.info("OLDBANANA LOADED");
browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) return; // skip during development
  switch (reason) {
    case "install":
      {
        const url = browser.runtime.getURL("welcome.htm");
        await browser.tabs.create({ url });
        // or: await browser.windows.create({ url, type: "popup", height: 600, width: 600, });
      }
      break;
    // see below
  }
});

function obReportInfo(string) {
	window.console.info("[OldBanana] " + string);
}

browser.runtime.onMessage.addListener(obInstallThemeInternal);

function obInstallThemeInternal(message) {
obReportInfo("Background recieved message");
if(typeof message.obInstallThemeAt !== undefined){
	browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("obico.png"),
    "title": "Installed theme.",
    "message": message.url
  });
	
  	var audio = new Audio("mixkit-sci-fi-interface-robot-click.wav");
  	audio.volume = 0.5;
  	audio.play();
  }
}
