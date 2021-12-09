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
