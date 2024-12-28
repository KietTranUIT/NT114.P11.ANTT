const TableWishList = () => {
  return (
    <>
      <div className="container mx-auto p-3">
        <h2 className="text-3xl font-semibold mb-5">
          Wishlist
          <span> (43)</span>
        </h2>
        <div>
          <div>
            <table
              className="table-fixed text-sm font-normal"
              style={{ width: "100%" }}
            >
              <thead className="border-y-2 border-y-gray-200">
                <tr>
                  <th
                    className="sort white-space-nowrap align-middle p-3"
                    scope="col"
                    style={{ width: "20%" }}
                  ></th>
                  <th
                    className="sort white-space-nowrap text-left p-3"
                    scope="col"
                    style={{ width: "30%", minWidth: "250px" }}
                    data-sort="products"
                  >
                    PRODUCTS
                  </th>
                  <th
                    className="sort text-start p-3"
                    scope="col"
                    data-sort="color"
                    style={{ width: "30%" }}
                  >
                    VARIANTS
                  </th>
                  <th
                    className="sort align-middle text-start asc p-3"
                    scope="col"
                    data-sort="price"
                    style={{ width: "15%" }}
                  >
                    PRICE
                  </th>
                  <th
                    className="sort text-center p-3"
                    scope="col"
                    style={{ width: "30%" }}
                  >
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((key, index) => {
                  return (
                    <>
                      <tr className="mb-3 border-b-2 border-b-gray-200">
                        <td className="text-center p-3">
                          <a
                            className=""
                            href="../../../apps/e-commerce/landing/product-details.html"
                          >
                            <img
                              src="/6.png"
                              alt=""
                              width="53"
                              className="mx-auto border border-gray-300 rounded-lg"
                            />
                          </a>
                        </td>
                        <td className="p-3">
                          <a
                            className="text-blue-500 hover:text-blue-700 line-clamp-3"
                            href="../../../apps/e-commerce/landing/product-details.html"
                          >
                            Fitbit Sense Advanced Smartwatch with Tools for
                            Heart Health, Stress Management &amp; Skin
                            Temperature Trends, Carbon/Graphite, One Size (S
                            &amp; L Bands)
                          </a>
                        </td>
                        <td className="p-3">Blue, 64 GB ram</td>
                        <td className="p-3">2.000.000 VND</td>
                        <td>
                          <div className="flex gap-3 items-center">
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                width="15px"
                                height="15px"
                                fill="#8a94ad"
                              >
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="flex gap-1 text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                width="15px"
                                height="15px"
                                fill="white"
                              >
                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                              </svg>
                              Add to cart
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default TableWishList;
