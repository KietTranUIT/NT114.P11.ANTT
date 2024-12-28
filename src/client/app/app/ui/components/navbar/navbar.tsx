const NavBar = () => {
  return (
    <>
      <div className="bg-white mb-5">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-4 py-2">
            <a
              href="/"
              className="text-base font-bold"
              style={{ color: "#525b75" }}
            >
              <div className="flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="15px"
                  height="15px"
                  fill="currentColor"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
                <h1>Danh mục</h1>
              </div>
            </a>
            <ul
              className="flex gap-5 font-semibold text-sm"
              style={{ color: "#525b75" }}
            >
              <li className="nav-item" data-nav-item="data-nav-item">
                <a
                  className="nav-link ps-0"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item" data-nav-item="data-nav-item">
                <a
                  className="nav-link"
                  href="../../../apps/e-commerce/landing/favourite-stores.html"
                >
                  My Favourite Stores
                </a>
              </li>
              <li className="nav-item active" data-nav-item="data-nav-item">
                <a
                  className="nav-link"
                  href="/products"
                >
                  Products
                </a>
              </li>
              <li className="nav-item" data-nav-item="data-nav-item">
                <a
                  className="nav-link"
                  href="wishlist"
                >
                  Wishlist
                </a>
              </li>
              <li className="nav-item active" data-nav-item="data-nav-item">
                <a
                  className="nav-link"
                  href="/account/trackorder"
                >
                  Track order
                </a>
              </li>
              <li className="nav-item" data-nav-item="data-nav-item">
                <a
                  className="nav-link pe-0"
                  href="/account/checkout"
                >
                  Checkout
                </a>
              </li>
              <li
                className="nav-item dropdown"
                data-nav-item="data-nav-item"
                data-more-item="data-more-item"
                style={{ display: "none" }}
              >
                <a
                  className="nav-link dropdown-toggle dropdown-caret-none fw-bold pe-0"
                  href="javascript: void(0)"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-boundary="window"
                  data-bs-reference="parent"
                >
                  {" "}
                  More
                  <svg
                    className="svg-inline--fa fa-angle-down ms-2"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    ></path>
                  </svg>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end category-list"
                  aria-labelledby="navbarDropdown"
                  data-category-list="data-category-list"
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
