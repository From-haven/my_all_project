document.getElementById('startButton').addEventListener('click', () => {
  createNewPopup();
});
function createNewPopup() {
  chrome.windows.create({
    url: chrome.runtime.getURL('popup/countdown_timer.html'), // URL của trang web bạn muốn mở
    type: 'popup', // Loại cửa sổ: popup, normal, panel
    width: 350, // Chiều rộng cửa sổ
    height: 167 // Chiều cao cửa sổ
  }, (newWindow) => {
    console.log('New window created:', newWindow.id);

    //ở dưới là tính năng xóa lỗi hiện nhiều cửa sổ (bug) nhưng mà chx phát triển xong nên để đó :((
  });
}