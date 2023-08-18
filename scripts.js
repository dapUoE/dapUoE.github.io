// Prevent context menu (right-click menu) on images
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Toggle the visibility of the overlay text
function toggleOverlayText(element, event) {
    // Get the card-text-overlay element
    const overlayText = element.closest('.card').querySelector('.card-text-overlay');
    
    // Toggle visibility
    if (overlayText.style.display === 'none') {
        overlayText.style.display = 'block';
    } else {
        overlayText.style.display = 'none';
    }
    
    // Prevent the event from bubbling up to parent elements and prevent the default behavior of the anchor tag
    event.stopPropagation();
    event.preventDefault();
}

/* Change chapter numbers */

document.addEventListener('DOMContentLoaded', function() {
    attachChapterNavigation('prevChapter');
    attachChapterNavigation('nextChapter');
    attachChapterNavigation('prevChapterBottom', 'prevChapter');
    attachChapterNavigation('nextChapterBottom', 'nextChapter');
});

function attachChapterNavigation(buttonId, actionId) {
    actionId = actionId || buttonId;
    const button = document.getElementById(buttonId);

    if (button) {
        button.addEventListener('click', function() {
            const currentChapterNumber = getCurrentChapterNumber();
            if (actionId === 'prevChapter' && currentChapterNumber > 1) {
                window.location.href = `arc8chapter${currentChapterNumber - 1}.html`;
            } else if (actionId === 'nextChapter') {
                window.location.href = `arc8chapter${currentChapterNumber + 1}.html`;
            }
        });
    }
}


function getCurrentChapterNumber() {
    const currentURL = window.location.pathname;
    const chapterRegex = /arc8chapter(\d+)\.html/;
    const match = currentURL.match(chapterRegex);
    
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return 0;  // default, can be adjusted based on the structure
}

//Privacy Policy
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#edeff5",
          "text": "#838391"
        },
        "button": {
          "background": "#4b81e8"
        }
      },
      "position": "bottom-left", // You can adjust this as needed
      "type": "info", // This makes the banner more unintrusive
      "content": {
        "message": "This site uses cookies for analytics and comments.",
        "dismiss": "Got it!",
        "link": "Learn More",
        "href": "/privacy-policy.html" // Link to your privacy policy page
      }
    });
});


//Cookie Consent
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#edeff5",
          "text": "#838391"
        },
        "button": {
          "background": "#4b81e8"
        }
      },
      "type": "opt-in",  // This makes sure that cookies are disabled until the user opts-in
      "position": "bottom-right",
      "content": {
        "message": "This site uses cookies for analytics and comments.",
        "allow": "Allow selected",
        "deny": "Deny",
        "link": "Learn More",
        "href": "/privacy-policy.html",
        "policy": "Cookie Policy"
      },
      "law": {
        "regionalLaw": false,
        "countryCode": "US"  // Replace with your country code if not in the US
      },
      "onStatusChange": function(status) {
        // Handle the cookie status (accepted or denied)
        if (status === "allow") {
          enableCookies();
        } else {
          disableCookies();
        }
      },
      "categories": {
        "necessary": {
          "needed": true,
          "wanted": true,
          "checked": true
        },
        "analytics": {
          "needed": false,
          "wanted": false,
          "checked": false
        },
        "comments": {
          "needed": false,
          "wanted": false,
          "checked": false
        }
      }
    });
});

function enableCookies() {
    // Enable Google Analytics and Disqus here
}

function disableCookies() {
    // Disable Google Analytics and Disqus here
}

function enableCookies() {
    // Enable Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'YOUR-GA-CODE', 'auto');
    ga('send', 'pageview');

    // For Disqus, you'd typically reload the Disqus thread if it's present on the page.
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true
        });
    }
}

function disableCookies() {
    // Disable Google Analytics (prevent further tracking)
    window['ga-disable-YOUR-GA-CODE'] = true; // Replace 'YOUR-GA-CODE' with your actual GA code

    // For Disqus, you might choose to hide the comments section or display a message
    // indicating that comments are disabled due to cookie preferences.
}
