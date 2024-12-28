"use client";
import { formatMoney, convertDateTime } from "@/app/lib/helps";

const Card = ({ product }) => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;

  let image = ''
  product.product_medias.map((media, index) => {
    if (media.isMain === true) {
      image = media.url
    }
  })
  return (
    <>
      <div className="flex" data-product-id={product.id}>
        <div className="flex flex-col justifi-between">
          <div className="">
            <div className="rounded-xl border-solid border-gray-200 relative flex border-2 mb-2">
              <button
                className="absolute top-2 right-2 p-2 rounded-full"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Add to wishlist"
                data-bs-original-title="Add to wishlist"
                style={{ color: "white", border: "1px solid #437bfe" }}
              >
                <svg
                  className="svg-inline--fa fa-heart d-block-hover"
                  data-fa-transform="down-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                  style={{ transformOrigin: "0.5em 0.5625em" }}
                  width="15px"
                  height="15px"
                >
                  <g transform="translate(256 256)">
                    <g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)">
                      <path
                        fill="currentColor"
                        strokeWidth="35px"
                        stroke="#437bfe"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                        transform="translate(-256 -256)"
                      ></path>
                    </g>
                  </g>
                </svg>
                <svg
                  className="svg-inline--fa fa-heart hidden"
                  data-fa-transform="down-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                  style={{ transformOrigin: "0.5em 0.5625em" }}
                  width="15px"
                  height="15px"
                >
                  <g transform="translate(256 256)">
                    <g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)">
                      <path
                        fill="currentColor"
                        d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                        transform="translate(-256 -256)"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
              <img className="img-fluid" src={image} alt="" />
            </div>
            <a
              className="stretched-link"
              href={`${url}/products/${product.slug}`}
            >
              <h6
                className="mb-2 text-xs font-bold line-clamp-3 text-wrap"
                style={{ height: "50px" }}
              >
                {product.name}
              </h6>
            </a>
            <div className="flex gap-1 items-center">
              <div className="flex gap-1" style={{ color: "#e5780b" }}>
                {[1, 2, 3, 4, 5].map((key, index) => {
                  if (index < Math.round(product.rating)) {
                    return (
                      <svg
                        className="svg-inline--fa fa-star text-warning"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="star"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        data-fa-i2svg=""
                        width="20px"
                        height="20px"
                      >
                        <path
                          fill="currentColor"
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        ></path>
                      </svg>
                    );
                  }
                  return (
                    <svg
                      className="svg-inline--fa fa-star text-warning-light fs-9 me-1"
                      data-bs-theme="light"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                      ></path>
                    </svg>
                  );
                })}
              </div>
              <span className="text-xs ms-1 text-gray-500 font-semibold">
                (0 đánh giá)
              </span>
            </div>
          </div>
          <div className="">
            <p
              className={`text-xs font-semibold mb-1 mt-1 ${
                product.stock === 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {product.stock === 0 ? "Hết hàng" : "Còn hàng"}
            </p>
            <div className="mb-0 flex items-center">
              {((product.startSale != null && product.endSale != null) && (new Date() > new Date(product.startSale) && new Date < new Date(product.endSale))) ? (
                <>
                  <p className="me-2 mb-0 line-through text-gray-500">
                    {formatMoney(product.regularPrice)}
                  </p>
                  <h3 className="text-red-600 mb-0 text-2xl font-semibold">
                    {formatMoney(product.salePrice)}
                  </h3>
                </>
              ) : (
                <>
                  <h3 className="text-red-600 mb-0 text-2xl font-semibold">
                    {formatMoney(product.regularPrice)}
                  </h3>
                </>
              )}
            </div>
            {/* <p className="text-xs lh-1 mb-0 mt-0 text-stone-400 font-semibold">
              2 colors
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
