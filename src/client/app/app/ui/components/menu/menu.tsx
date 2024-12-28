const Menu = () => {
  return (
    <div>
      <div className="container mx-auto px-4 mt-5 mb-5">
        <div className="scrollbar">
          <div className="flex justify-between">
            <a className="icon-nav-item" href="#!">
              <div
                className="icon-container mb-1 p-3 rounded-xl"
                data-bs-theme="light"
                style={{ backgroundColor: "#ffefca" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                  viewBox="0 0 576 512"
                  width="25px"
                  height="25px"
                >
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Deals
              </p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Grocery</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Fashion</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Mobile</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Eletronics</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Home</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Dining</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Gifts</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">tools</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Travel</p>
            </a>
            <a className="icon-nav-item" href="#!">
              <div className="icon-container mb-1 p-3 rounded-xl bg-sky-100" data-bs-theme="undefined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  className="mx-auto"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">Others</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
