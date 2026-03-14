document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const registerForm = document.getElementById("register-form");

  const hasClosedPopup = localStorage.getItem("hasClosedPopup");

  if (popupOverlay && !hasClosedPopup) {
    setTimeout(() => {
      popupOverlay.classList.remove("hidden");
      popupOverlay.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }, 2000);
  }

  function closePopup() {
    popupOverlay.classList.add("hidden");
    popupOverlay.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    localStorage.setItem("hasClosedPopup", "true");
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", closePopup);
  }

  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const hoTen = document.getElementById("hoTen").value.trim();
      const soDienThoai = document.getElementById("soDienThoai").value.trim();
      const tinhThanh = document.getElementById("tinhThanh").value;
      const ghiChu = document.getElementById("ghiChu").value.trim();

      if (!hoTen || !soDienThoai) {
        alert("Vui lòng nhập họ tên và số điện thoại.");
        return;
      }

      const data = {
        hoTen,
        soDienThoai,
        tinhThanh,
        ghiChu,
      };

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwCPZ73lCL2k-sNsrfABM55v4qcHDI4mQJBtkbyJrc4Ofc6SxcerWlPui8vZEdG6vd1/exec",
          {
            method: "POST",
            body: JSON.stringify(data),
          },
        );

        const result = await response.json();

        if (result.success) {
          alert("Gửi thông tin thành công!");
          localStorage.setItem("hasClosedPopup", "true");
          registerForm.reset();
          closePopup();
        } else {
          alert("Có lỗi khi lưu dữ liệu!");
          console.error(result);
        }
      } catch (error) {
        alert("Không thể gửi dữ liệu. Vui lòng thử lại!");
        console.error(error);
      }
    });
  }
});
