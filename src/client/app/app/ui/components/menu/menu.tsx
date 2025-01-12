const Menu = () => {
  return (
    <div>
      <div className="container mx-auto px-4 mt-5 mb-5">
        <div className="scrollbar">
          <div className="flex justify-between">
            <a className="icon-nav-item gap-1" href="/categories/dien-thoai">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400 flex items-center justify-center"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width="25px"
                  height="25px"
                  fill="white"
                >
                  <path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Điện thoại
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/laptop">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="25px"
                  height="25px"
                  fill="white"
                >
                  <path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Laptop
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/phu-kien">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="25px"
                  height="25px"
                  fill={"white"}
                >
                  <path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80l0-16 0-48 0-48C0 146.6 114.6 32 256 32s256 114.6 256 256l0 48 0 48 0 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Phụ kiện
              </p>
            </a>
            <a className="icon-nav-item" href="smartwatch">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400 flex items-center justify-center"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={25}
                  height={25}
                  fill={"white"}
                >
                  <path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0 0 34.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6L256 64l16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L224 0 176 0zm72 192l0 128c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-128c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Đồng hồ
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/man-hinh">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400 flex items-center justify-center"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width="25px"
                  height="25px"
                  fill={'white'}
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Màn hình
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/tablet">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25px"
                  height="25px"
                  fill={"white"}
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM176 432l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Tablet
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/may-tinh">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="25px"
                  height="25px"
                  fill={"white"}
                >
                  <path d="M384 96l0 224L64 320 64 96l320 0zM64 32C28.7 32 0 60.7 0 96L0 320c0 35.3 28.7 64 64 64l117.3 0-10.7 32L96 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-74.7 0-10.7-32L384 384c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L64 32zm464 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0zm16 64l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Máy tính
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/ban-phim">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width={25}
                  height={25}
                  fill={'white'}
                >
                  <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32zM272 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM368 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM464 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Bàn phím
              </p>
            </a>
            <a className="icon-nav-item" href="/categories/sac-du-phong">
              <div
                className="icon-container mb-1 p-4 rounded-xl bg-orange-400"
                data-bs-theme="undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width={25}
                  height={25}
                  fill={"white"}
                >
                  <path d="M80 160c-8.8 0-16 7.2-16 16l0 160c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16L80 160zM0 176c0-44.2 35.8-80 80-80l384 0c44.2 0 80 35.8 80 80l0 16c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 16c0 44.2-35.8 80-80 80L80 416c-44.2 0-80-35.8-80-80L0 176z" />
                </svg>
              </div>
              <p className="nav-label text-center text-sm font-semibold">
                Cục sạc
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
