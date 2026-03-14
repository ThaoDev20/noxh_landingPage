document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const registerForm = document.getElementById("register-form");

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");

  const hasClosedPopup = localStorage.getItem("hasClosedPopup");

  if (popupOverlay && !hasClosedPopup) {
    setTimeout(() => {
      popupOverlay.classList.remove("hidden");
      popupOverlay.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }, 2000);
  }

  function closePopup() {
    if (!popupOverlay) return;
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
      const canHo = document.getElementById("canHo").value;
      const ghiChu = document.getElementById("ghiChu").value.trim();

      if (!hoTen || !soDienThoai) {
        alert("Vui lòng nhập họ tên và số điện thoại.");
        return;
      }

      const data = {
        hoTen,
        soDienThoai,
        canHo,
        ghiChu,
      };

      // Đổi trạng thái nút sang đang gửi
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-70", "cursor-not-allowed");
      }

      if (btnText) {
        btnText.textContent = "Đang gửi...";
      }

      if (btnSpinner) {
        btnSpinner.classList.remove("hidden");
      }

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwCPZ73lCL2k-sNsrfABM55v4qcHDI4mQJBtkbyJrc4Ofc6SxcerWlPui8vZEdG6vd1/exec",
          {
            method: "POST",
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();

        if (result.success) {
          if (btnText) {
            btnText.textContent = "Đã gửi ✓";
          }

          if (btnSpinner) {
            btnSpinner.classList.add("hidden");
          }

          localStorage.setItem("hasClosedPopup", "true");

          setTimeout(() => {
            registerForm.reset();
            closePopup();

            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
            }

            if (btnText) {
              btnText.textContent = "Gửi thông tin";
            }
          }, 1200);
        } else {
          if (btnText) {
            btnText.textContent = "Gửi thất bại";
          }

          if (btnSpinner) {
            btnSpinner.classList.add("hidden");
          }

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
            }

            if (btnText) {
              btnText.textContent = "Gửi thông tin";
            }
          }, 1500);

          console.error(result);
        }
      } catch (error) {
        if (btnText) {
          btnText.textContent = "Gửi thất bại";
        }

        if (btnSpinner) {
          btnSpinner.classList.add("hidden");
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
          }

          if (btnText) {
            btnText.textContent = "Gửi thông tin";
          }
        }, 1500);

        console.error(error);
      }
    });
  }
});