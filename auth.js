(() => {
  const PASSWORD = "pompinkpu";
  const STORAGE_KEY = "site_authenticated";

  // already authenticated
  if (sessionStorage.getItem(STORAGE_KEY) === "true") {
    return;
  }

  // create popup
  const overlay = document.createElement("div");

  overlay.innerHTML = `
    <div id="auth-overlay">
      <div id="auth-box">
        <h2>Protected Page</h2>
        <p>Please enter password</p>

        <input type="password" id="auth-password" />
        <button id="auth-submit">Enter</button>

        <p id="auth-error"></p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // styles
  const style = document.createElement("style");

  style.innerHTML = `
    #auth-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
    }

    #auth-box {
      background: white;
      padding: 24px;
      border-radius: 12px;
      width: 320px;
      text-align: center;
      font-family: Arial;
    }

    #auth-password {
      width: 100%;
      padding: 10px;
      margin-top: 12px;
      margin-bottom: 12px;
      box-sizing: border-box;
    }

    #auth-submit {
      padding: 10px 20px;
      cursor: pointer;
    }

    #auth-error {
      color: red;
      margin-top: 10px;
    }
  `;

  document.head.appendChild(style);

  // auth logic
  document
    .getElementById("auth-submit")
    .addEventListener("click", () => {

      const entered =
        document.getElementById("auth-password").value;

      if (entered === PASSWORD) {

        sessionStorage.setItem(STORAGE_KEY, "true");

        document.getElementById("auth-overlay").remove();

      } else {

        document.getElementById("auth-error")
          .innerText = "Wrong password";
      }
    });

})();