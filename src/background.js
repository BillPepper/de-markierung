// send text to tabs to show in overlay
const onClickHandler = (info, tab) => {
  var sText = info.selectionText;
  console.log("You don't like the word ", sText);
  let msg = {
    txt: sText,
  };
  chrome.tabs.sendMessage(tab.id, msg);
};

// add event listener for context menu option
chrome.runtime.onInstalled.addListener(function () {
  var context = "selection";
  var title = "Wort ersetzen";
  chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: "context" + context,
  });
});

chrome.contextMenus.onClicked.addListener(onClickHandler);
