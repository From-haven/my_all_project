chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});
let timer = {
    remainingTime: 0,
    isPaused: false,
    initialTime: 0,
    warningTriggered: false,
  };
  let timerInterval;
  
  // Start the countdown timer
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timer.remainingTime <= 0) {
        clearInterval(timerInterval);
        chrome.storage.local.set({ timer });
        notifyEnd();
      } else {
        if (!timer.warningTriggered && timer.initialTime >= 25 * 60 && timer.remainingTime <= timer.initialTime * 0.15) {
          notifyWarning();
          timer.warningTriggered = true;
        }
        timer.remainingTime--;
        chrome.storage.local.set({ timer });
      }
    }, 1000);
  }
  
  // Pause the countdown timer
  function pauseTimer() {
    clearInterval(timerInterval);
    timer.isPaused = true;
    chrome.storage.local.set({ timer });
  }
  
  // Reset the countdown timer
  function resetTimer() {
    clearInterval(timerInterval);
    timer = {
      remainingTime: 0,
      isPaused: false,
      initialTime: 0,
      warningTriggered: false,
    };
    chrome.storage.local.set({ timer });
  }
  
  // Send notifications
  function notifyEnd() {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon128.png",
      title: "Timer Ended",
      message: "Your countdown has finished!",
    });
  }
  
  function notifyWarning() {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon128.png",
      title: "Warning",
      message: "15% of your time remaining!",
    });
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "start") {
      timer.remainingTime = message.time;
      timer.initialTime = message.time;
      timer.isPaused = false;
      timer.warningTriggered = false;
      startTimer();
      sendResponse({ status: "started" });
    } else if (message.type === "pause") {
      pauseTimer();
      sendResponse({ status: "paused" });
    } else if (message.type === "reset") {
      resetTimer();
      sendResponse({ status: "reset" });
    } else if (message.type === "resume") {
      timer.isPaused = false;
      startTimer();
      sendResponse({ status: "resumed" });
    } else if (message.type === "getStatus") {
      sendResponse(timer);
    }
  });
  