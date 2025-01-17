//css selectors
storySelector = '.zGtbP';
feedSelector = '._1SP8R div:nth-child(1) div:nth-child(2) ._8Rm4L';
postSelector = '_8Rm4L'
loadingIconSelector = '.By4nA';
storyNameSelector = '.eebAO';
suggestionsSelector = '._8UZ6e';
//enable | disable css
disableString = '{display:none}';
enableString = '{display:initial}';

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

function disableFeed() {
    addStyle(feedSelector + disableString);
    addStyle(postSelector + disableString);
    addStyle(loadingIconSelector + disableString);
    addStyle(storyNameSelector + enableString);
}

function disableStory() {
    addStyle(storySelector + disableString);
}

function disableSuggestions()
{
    addStyle(suggestionsSelector + disableString);
}

function enableFeed() {
    addStyle(feedSelector + enableString);
    addStyle(postSelector + enableString);
    addStyle(loadingIconSelector + enableString);
}

function enableStory() {
    addStyle(storySelector + enableString);
}

function enableSuggestions()
{
    addStyle(suggestionsSelector + enableString);
}

function initContent()
{
    chrome.storage.sync.get(['story'], function (result) {
        if (result.story == true) {
            disableStory();
        }
    });
    chrome.storage.sync.get(['feed'], function (result) {
        if (result.feed == true) {
            disableFeed();
        }
    });
    chrome.storage.sync.get(['suggestions'], function (result) {
        if (result.suggestions == true) {
            disableSuggestions();
        }
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];

        if (key == 'story') {
            var newValue = storageChange.newValue;
            if (newValue == true) {
                disableStory();
            }
            if (newValue == false) {
                enableStory();
            }
        }

        if (key == 'feed') {
            var newValue = storageChange.newValue;
            if (newValue == true) {
                disableFeed();
            }
            if (newValue == false) {
                enableFeed();
            }
        }

        if(key == "suggestions"){
            var newValue = storageChange.newValue;
            if (newValue == true) {
                disableSuggestions();
            }
            if (newValue == false) {
                enableSuggestions();
            }
        }
    }
});

initContent();