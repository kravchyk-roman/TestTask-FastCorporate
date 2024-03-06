const carts = document.querySelectorAll(".cart");
const cartWprapper = document.querySelector(".cart-wrapper");
const downloadBanner = document.querySelector(".download-banner");
const footerYear = document.querySelector(".footer__year");

const URL = "https://veryfast.io/t/front_test_api.php";

function setYear() {
  const year = new Date().getFullYear();
  footerYear.textContent = year;
}

function renderBaner() {
  const bannerTimeout = () => {
    downloadBanner.classList.add("download-banner--active");
    setTimeout(() => {
      downloadBanner.classList.remove("download-banner--active");
    }, 5000);
  };

  if (screen.width < 1024) {
    setTimeout(bannerTimeout, 1500);
    return;
  }

  if (
    navigator.userAgent.toLowerCase().includes("edg") ||
    navigator.userAgent.toLowerCase().includes("edge")
  ) {
    setTimeout(bannerTimeout, 1500);
  } else if (navigator.userAgent.toLowerCase().includes("firefox")) {
    setTimeout(bannerTimeout, 1500);
  } else if (navigator.userAgent.toLowerCase().includes("chrome")) {
    downloadBanner.classList.add("download-banner--bottom");
    setTimeout(bannerTimeout, 1500);
  } else {
    setTimeout(bannerTimeout, 1500);
  }
}

function renderLoader() {
  cartWprapper.innerHTML = `<div class="loader"></div>`;
}

function renderCarts(carts) {
  cartWprapper.innerHTML = ``;

  carts.result.elements.forEach((item) => {
    const {
      amount,
      license_name: licenseName,
      name_display: nameDisplay,
      price_key: priceKey,
      is_best: isBest,
      link,
    } = item;
    const discount = parseFloat(amount) * 2;

    cartWprapper.innerHTML += `
        <div class="cart">
          <div class="cart__price">
            <div class="cart__banner-sale ${
              priceKey === "50%" ? "cart__banner-sale--active" : ""
            }">
              <img src="./icons/sale-banner.svg" alt="sale50%">
            </div>
            <div class="cart__banner-value ${
              isBest ? "cart__banner-value--active" : ""
            }">
              Best value
            </div>
            <p>${amount}</p>
            <span>
              /per year
            </span>
            <p class="cart__price-sale ${
              priceKey === "50%" ? "cart__price-sale--active" : ""
            }">${discount.toFixed(2)}</p>
          </div>
          <div class="cart__content">
            <p class="cart__type-name">${nameDisplay.slice(0, 24)}</p>
            <p class="cart__type-duration">${licenseName}</p>
          </div>
          <button type="button" class="cart__button" data-download="${link}">
            download
            <span class="download-img">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 0C6.72517 0 0 6.71012 0 15C0 23.2899 6.71013 30 15 30C23.2899 30 30 23.2899 30 15C30 6.71012 23.2748 0 15 0ZM12.2768 14.6239H13.2547C13.4654 14.6239 13.6459 14.4584 13.6459 14.2327V8.33501C13.6459 8.12438 13.8114 7.94382 14.0371 7.94382H15.9629C16.1735 7.94382 16.3541 8.10933 16.3541 8.33501V14.2327C16.3541 14.4433 16.5195 14.6239 16.7452 14.6239H17.7231C18.0391 14.6239 18.2196 15 18.0241 15.2558L15.3009 18.671C15.1505 18.8666 14.8495 18.8666 14.6991 18.671L11.991 15.2558C11.7803 15 11.9609 14.6239 12.2768 14.6239ZM23.5155 20.2507V21.65C23.5155 21.8606 23.3501 22.0411 23.1244 22.0411H8.39516H6.86056C6.64993 22.0411 6.46941 21.8756 6.46941 21.65V20.2507V16.4443C6.46941 16.2337 6.63489 16.0532 6.86056 16.0532H8.00401C8.21464 16.0532 8.39516 16.2186 8.39516 16.4443V19.8596C8.39516 20.0702 8.56067 20.2507 8.78635 20.2507H21.1534C21.3641 20.2507 21.5446 20.0853 21.5446 19.8596V16.4443C21.5446 16.2337 21.7101 16.0532 21.9358 16.0532H23.1394C23.35 16.0532 23.5306 16.2186 23.5306 16.4443V20.2507H23.5155Z"
                  fill="white" />
              </svg>
            </span>
          </button>
        </div>
  `;
  });

  const downloadBtn = document.querySelectorAll(".cart__button");
  downloadBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open(btn.dataset.download, "_self");
      renderBaner();
    });
  });
}

async function getData() {
  try {
    renderLoader();
    const response = await fetch(URL);
    const data = await response.json();
    renderCarts(data);
  } catch (err) {
    cartWprapper.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

setYear();
getData();
