let notificationBlockingListener = null;

var targetURLs = [
    "https://example.com/notifications", // URL thông báo cụ thể
    "https://anotherexample.com/alerts" // URL khác cần chặn
];


function startBlockingNotifications() {
    if (notificationBlockingListener) {
        console.log("Notification blocking is already active.");
        return;
    }

    // Hàm listener để chặn thông báo cụ thể
    notificationBlockingListener = function (details) {
        

        // Kiểm tra URL có trong danh sách chặn hay không
        if (targetURLs.some(url => details.url.startsWith(url))) {
            console.log(`Blocked notification from: ${details.url}`);
            return { cancel: true }; // Chặn yêu cầu này
        }

        // Nếu không khớp, cho phép tiếp tục
        return { cancel: false };
    };

    chrome.webRequest.onBeforeRequest.addListener(
        notificationBlockingListener,
        {
            urls: ["<all_urls>"] // Theo dõi mọi URL
        },
        ["blocking"]
    );

    console.log("Notification blocking for specific targets started.");
}

function stopBlockingNotifications() {
    if (!notificationBlockingListener) {
        console.log("Notification blocking is not active.");
        return;
    }

    // Loại bỏ listener đã thêm
    chrome.webRequest.onBeforeRequest.removeListener(notificationBlockingListener);
    notificationBlockingListener = null;

    console.log("Notification blocking stopped.");
}
