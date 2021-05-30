const { remote } = require("electron");
const mainProcess = remote.require("./main.js");

var Discord = mainProcess.getDiscordJS();
var client = mainProcess.getDCJSClient();
//var cache = mainProcess.getCache();

window.addEventListener("DOMContentLoaded", () => {
	if(!client.user) {
		loginDialogue(token => {
			console.log("Login Dialogue returned token:", token);
			if(token) {
				mainProcess.setToken(token);
				mainProcess.login();
			}
			// reopen loginDialogue
		});
	} else {
		onLoaded();
		
	}
})
