// send text to tabs to show in overlay
const onClickHandler = (info, tab) => {
  console.log(`You right clicked ${info.selectionText}`);

  let msg = {
    type: "USER_ADD_WORD",
    payload: info.selectionText,
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
