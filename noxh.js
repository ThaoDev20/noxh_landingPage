const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLW76pVpdgvlcmKo8QKL4ZqU0gXfs2SCcDgmN-PAxiK_lFwjPQd-iUPHPUDkoCd0776g/exec";

const verifyBtn = document.getElementById("verify-btn");
const codeInput = document.getElementById("code-input");
const authSection = document.getElementById("auth-section");
const contentSection = document.getElementById("content-section");

// Hàm hiển thị nội dung
function showContent() {
  if (authSection && contentSection) {
    authSection.classList.add("hidden");
    contentSection.classList.remove("hidden");
  }
}

function init() {
  const pageId = document.getElementById("page-id").value;
  if (!pageId) {
    console.error("LỖI: Không tìm thấy thẻ <input id='page-id'>");
    return;
  }

  if (localStorage.getItem(`user_code_${pageId}`)) {
    showContent();
  } else {
    console.log("Chưa có mã hoặc mã không khớp trang này.");
  }

}

verifyBtn.addEventListener("click", async () => {
  const pageId = document.getElementById("page-id").value;
  const code = codeInput.value.trim();

  if (!code) return alert("Vui lòng nhập mã!");

  verifyBtn.innerText = "Đang kiểm tra...";
  verifyBtn.disabled = true;

  try {
    const response = await fetch(`${SCRIPT_URL}?code=${code}&pageId=${pageId}`);
    const result = await response.json();

    if (result.success) {
      const pageId = document.getElementById("page-id").value;

      localStorage.setItem(`user_code_${pageId}`, code);

      showContent();
    } else {
      alert("Mã code không chính xác cho trang này!");
    }
  } catch (error) {
    console.error("Lỗi fetch:", error);
    alert("Không thể kết nối đến máy chủ.");
  } finally {
    verifyBtn.innerText = "Xác nhận";
    verifyBtn.disabled = false;
  }
});

init();
