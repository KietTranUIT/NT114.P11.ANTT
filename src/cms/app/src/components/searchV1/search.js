import Autocomplete from "@mui/joy/Autocomplete";
import { FormControl, FormLabel, Button, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import { debounce, set } from "lodash";
import { useState } from "react";
import {
  formatTimeStamp,
  deleteBrand,
  deleteBrands,
  searchBrand,
  getBrands,
  getTotalBrands,
  getProducts,
  formatToVNDCustom,
} from "./../../helpers";

const SearchV1 = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (query) => {
    if (query === "") {
      query = "~";
    }
    const result = await getProducts({ search: query });

    if (!(result instanceof Error)) {
      if (result.data.length <= 0) {
        setSearchResult([]);
      } else {
        setSearchResult(result.data);
      }
    }
  };

  const handleClickOutside = () => {
    let dropdown = document.getElementById("dropdown");
    if (dropdown == null) {
      return;
    }
    {
      dropdown.classList.add("d-none");
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  // Search category
  const handleSearchChange = (event) => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.remove("d-none");

    debouncedSearch(event.target.value);
  };
  return (
    <div className="position-relative">
      <div className="d-flex gap-3">
        <div className="d-flex gap-3">
          <FormControl style={{ width: "700px" }}>
            <FormLabel></FormLabel>
            <Input
              className="p-2 bg-white"
              placeholder="Tìm kiếm sản phẩm..."
              startDecorator={<SearchIcon />}
              onChange={handleSearchChange}
            />
          </FormControl>
        </div>
      </div>
      <div
        id="dropdown"
        className="bg-white divide-y divide-gray-100 rounded-lg shadow w-[500px]"
        style={{
          position: "absolute",
          zIndex: 10,
          marginTop: "43px",
          width: "500px",
        }}
      >
        <ul
          className="py-2 text-sm text-gray-700 list-unstyled"
          aria-labelledby="dropdownDefaultButton"
        >
          <li
            className="px-4 py-2 bg-orange-400 text-white font-semibold flex justify-between"
            style={{ backgroundColor: "#d1d5db", color: "black" }}
          >
            {" "}
            <span style={{ color: "black" }}>Sản phẩm gợi ý</span>
          </li>
          {searchResult.length === 0 ? (
            <li className="px-3 pt-3">Không tìm thấy sản phẩm</li>
          ) : (
            <>
              {searchResult.map((product, index) => {
                return (
                  <li key={index}>
                    <a
                      href={`/products/${product.slug}`}
                      className="d-flex gap-5 align-items-center block px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src={product.product_medias[0].url}
                        width="80"
                        height="80"
                      />
                      <div>
                        <h3
                          className="text-sm line-clamp-2"
                          style={{ fontSize: "14px" }}
                        >
                          {product.name}
                        </h3>
                        {product.startSale != null &&
                        product.endSale != null &&
                        new Date() > new Date(product.startSale) &&
                        new Date() < new Date(product.endSale) ? (
                          <>
                            <h3 className="text-red-500 mb-0 text-sm">
                              {/* {product.type_discount === "percent"
                                              ? formatMoney(
                                                  product.regularPrice -
                                                    (product.regularPrice *
                                                      product.discount) /
                                                      100
                                                )
                                              : formatMoney(
                                                  product.regularPrice -
                                                    product.discount
                                                )} */}
                            </h3>
                            <div className="flex gap-1">
                              <p className="me-2 mb-0 line-through text-gray-500">
                                {/* {formatMoney(
                                                product.regularPrice
                                              )} */}
                              </p>
                              <span className="text-red-500">
                                {/* {product.type_discount ===
                                              "percent"
                                                ? `-${product.discount}%`
                                                : `-${formatMoney(
                                                    product.discount
                                                  )}`} */}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-red-600 mb-0 text-sm">
                              {/* {formatMoney(product.regularPrice)} */}
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

export default SearchV1;
