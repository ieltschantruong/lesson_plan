(() => {

  const PASSWORD = "pompinkpu";
  const STORAGE_KEY = "site_authenticated";

  // immediately hide page
  document.documentElement.style.visibility = "hidden";

  // already authenticated
  if (sessionStorage.getItem(STORAGE_KEY) === "true") {

    document.documentElement.style.visibility = "visible";

    return;
  }

  // wait until DOM ready
  window.addEventListener("DOMContentLoaded", () => {

    // create styles
    const style = document.createElement("style");

    style.innerHTML = `
      #auth-overlay {
        position: fixed;
        inset: 0;

        background: rgba(0,0,0,0.88);

        display: flex;
        align-items: center;
        justify-content: center;

        z-index: 2147483647;

        font-family: Arial, sans-serif;
      }

      #auth-box {
        width: 340px;

        background: white;

        border-radius: 14px;

        padding: 28px;

        box-sizing: border-box;

        text-align: center;

        box-shadow:
          0 10px 30px rgba(0,0,0,0.35);
      }

      #auth-box h2 {
        margin-top: 0;
      }

      #auth-password {
        width: 100%;

        padding: 12px;

        margin-top: 14px;
        margin-bottom: 14px;

        box-sizing: border-box;
      }

      #auth-submit {
        width: 100%;

        padding: 12px;

        cursor: pointer;
      }

      #auth-error {
        color: red;

        min-height: 20px;

        margin-top: 10px;
      }
    `;

    document.head.appendChild(style);

    // create overlay
    const overlay = document.createElement("div");

    overlay.id = "auth-overlay";

    overlay.innerHTML = `
      <div id="auth-box">

        <h2>Protected Page</h2>

        <p>Please enter password</p>

        <input
          type="password"
          id="auth-password"
          placeholder="Password"
          autofocus
        />

        <button id="auth-submit">
          Enter
        </button>

        <p id="auth-error"></p>

      </div>
    `;

    document.body.appendChild(overlay);

    const passwordInput =
      document.getElementById("auth-password");

    const submitButton =
      document.getElementById("auth-submit");

    const errorText =
      document.getElementById("auth-error");

    function unlockPage() {

      sessionStorage.setItem(
        STORAGE_KEY,
        "true"
      );

      overlay.remove();

      document.documentElement.style.visibility =
        "visible";
    }

    function validatePassword() {

      if (passwordInput.value === PASSWORD) {

        unlockPage();

      } else {

        errorText.innerText =
          "Wrong password";

        passwordInput.value = "";

        passwordInput.focus();
      }
    }

    submitButton.addEventListener(
      "click",
      validatePassword
    );

    passwordInput.addEventListener(
      "keydown",
      (e) => {

        if (e.key === "Enter") {

          validatePassword();
        }
      }
    );

  });

})();