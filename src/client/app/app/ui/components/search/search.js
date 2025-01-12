"use client";
import { useState, useEffect } from "react";
import { debounce, set } from "lodash";
import { getProducts } from "@/app/lib/helps";
import { formatMoney } from "@/app/lib/helps";
const SearchInput = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const handleSearch = async (query) => {
    const result = await getProducts({ search: query });
    console.log(result);
    if (!(result instanceof Error)) {
      if (result.data.length <= 0) {
        setProducts([]);
      } else {
        setProducts(result.data);
      }
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);
  const handleSearchChange = (event) => {
    let dropdown = document.getElementById("dropdown");
    dropdown.classList.remove("hidden");
    let query = event.target.value;
    if (query === "") {
      query = "~";
    }
    debouncedSearch(query);
  };

  const handleClickOutside = () => {
    let dropdown = document.getElementById("dropdown");
    dropdown.classList.add("hidden");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      <div className="relative text-gray-600">
        <input
          type="search"
          name="serch"
          placeholder="Tìm kiếm sản phẩm"
          onClick={handleClickOutside}
          onChange={handleSearchChange}
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          style={{ width: "500px" }}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <div
        id="dropdown"
        className="hidden z-10 absolute mt-[40px] bg-white divide-y divide-gray-100 rounded-lg shadow w-[500px]"
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="px-4 py-2 bg-orange-400 text-white font-semibold flex justify-between"> Sản phẩm gợi ý
          </li>
          {count && products.length === 0 ? (
            <li>Không tìm thấy sản phẩm</li>
          ) : (
            <>
              {products.map((product, index) => {
                return (
                  <li key={index}>
                    <a
                      href={`/products/${product.slug}`}
                      className="flex gap-5 items-center block px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src={product.product_medias[0].url}
                        width="80"
                        height="80"
                      />
                      <div>
                        <h3 className="text-sm line-clamp-2">{product.name}</h3>
                        {product.startSale != null &&
                        product.endSale != null &&
                        new Date() > new Date(product.startSale) &&
                        new Date() < new Date(product.endSale) ? (
                          <>
                            <h3 className="text-red-500 mb-0 text-sm">
                              {product.type_discount === "percent"
                                ? formatMoney(
                                    product.regularPrice -
                                      (product.regularPrice *
                                        product.discount) /
                                        100
                                  )
                                : formatMoney(
                                    product.regularPrice - product.discount
                                  )}
                            </h3>
                            <div className="flex gap-1">
                              <p className="me-2 mb-0 line-through text-gray-500">
                                {formatMoney(product.regularPrice)}
                              </p>
                              <span className="text-red-500">
                                {product.type_discount === "percent"
                                  ? `-${product.discount}%`
                                  : `-${formatMoney(product.discount)}`}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-red-600 mb-0 text-sm">
                              {formatMoney(product.regularPrice)}
                            </h3>
                          </>
                        )}
                      </div>
                    </a>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
