import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import "./listproduct.css";

function ListProducts() {
    return (
        <>
        <Header />
        <Panel />
            <div className="content">
                <div className="mb-9">
                    <div className="mb-4">
                        <h2>Products</h2>
                    </div>
                </div>
                <ul className="nav nav-links mx-n3 mb-3">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            <span className="fw-semibold">All </span>
                            <span>(68817)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            <span className="fw-semibold">Published </span>
                            <span>(70348)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            <span className="fw-semibold">Draft </span>
                            <span>(17)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            <span className="fw-semibold">On discount </span>
                            <span>(810)</span>
                        </a>
                    </li>
                </ul>
                <div id="products">
                    <div className="mb-4">
                        <div className="d-flex gap-5">
                            <div className="search-box">
                                <form id="form1">
                                    <div className="input-group d-flex">
                                        <div className="form-outline">
                                            <input type="search" id="form1" className="form-control" placeholder="search"/>
                                        </div>
                                        <button type="button" className="btn btn-primary">
                                            search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="scrollbar overflow-hidden-y">
                                <div className="d-flex gap-3">
                                    <div className="input-group mb-2">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                                            Category
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-group mb-2">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                                            Brand
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-group mb-2">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                                            Brand
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary">
                                    <span className="fw-bold">+ </span>Add product
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:"-30px",paddingLeft:"30px", marginRight:"-30px", paddingRight:"30px", fontSize:"13px"}} className="bg-white border-top border-bottom border-translucent position-relative top-1">
                        <div className="table-responsive scrollbar">
                            <table className="table fs-9 mb-0">
                                <thead>
                                    <tr className="" style={{fontSize:"13px"}}>
                                        <th className="white-space-nowrap fs-9 align-middle pl-1" style={{maxWidth:"20px",width:"18px"}}>
                                            <div className="form-check mb-0 fs-8">
                                                <input className="form-check-input" id="checkbox-bulk-products-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;products-table-body&quot;}" />
                                            </div>
                                        </th>
                                        <th className="sort white-space-nowrap align-middle fs-10" scope="col" style={{width:"70px"}}></th>
                                        <th className="sort white-space-nowrap align-middle ps-4" scope="col" style={{width:"350px"}} data-sort="product">PRODUCT NAME</th>
                                        <th className="sort align-middle text-end ps-4" scope="col" data-sort="price" style={{width:"150px"}}>PRICE</th>
                                        <th className="sort align-middle ps-4" scope="col" data-sort="category" style={{width:"150px"}}>CATEGORY</th>
                                        <th className="sort align-middle ps-3" scope="col" data-sort="tags" style={{width:"230px"}}>TAGS</th>
                                        <th className="sort align-middle fs-8 text-center ps-4" scope="col" style={{width:"125px"}}></th>
                                        <th className="sort align-middle ps-4" scope="col" data-sort="vendor" style={{width:"200px"}}>VENDOR</th>
                                        <th className="sort align-middle ps-4" scope="col" data-sort="time" style={{width:"70px"}}>PUBLISHED ON</th>
                                        <th className="sort text-end align-middle pe-0 ps-4" scope="col"></th>
                                    </tr>
                                </thead>
                  <tbody className="list" id="products-table-body">
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    <tr className="position-static">
                      <td className="fs-9 align-middle">
                        <div className="form-check mb-0 fs-8"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                      </td>
                      <td className="align-middle white-space-nowrap py-0"><a className="d-block border border-translucent rounded-2" href="../../../apps/e-commerce/landing/product-details.html"><img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1732158837/public/test_gu6ynz.png" alt="" width="53" /></a></td>
                      <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; ...</a></td>
                      <td className="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">$39</td>
                      <td className="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">Plants</td>
                      <td className="tags align-middle review pb-2 ps-3" style={{minWidth:"225px"}}>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Health</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Exercise</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Discipline</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Lifestyle</span></a>
                        <a className="text-decoration-none" href="#!"><span className="badge badge-tags me-2 mb-2" style={{backgroundColor: "#e3e6ed", fontSize: "12px", color: "#000000", fontWeight:600}}>Fitness</span></a>
                        </td>
                      <td className="align-middle review fs-8 text-center ps-4">
                        <div className="d-toggle-container">
                          <div className="d-block-hover">
                            <svg width="20px" className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                        </div>
                          <div className="d-none-hover d-none"><svg className="svg-inline--fa fa-star text-warning" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg></div>
                        </div>
                      </td>
                      <td className="vendor align-middle text-start fw-semibold ps-4"><a href="#!">Blue Olive Plant sellers. Inc</a></td>
                      <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM</td>
                    </tr>
                    </tbody>
                </table>
              </div>
              <div className="row align-items-center justify-content-between py-2 pe-0 fs-9">
                <div className="col-auto d-flex align-items-center">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semibold text-body" data-list-info="data-list-info">1 to 10 <span className="text-body-tertiary"> Items of </span>16</p><a className="fw-semibold text-decoration-none" href="#!" data-list-view="*">View all<svg width="7px" className="svg-inline--fa fa-angle-right ms-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style={{transformOrigin: "0.3125em 0.5625em"}}><g transform="translate(160 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" transform="translate(-160 -256)"></path></g></g></svg></a><a className="fw-semibold d-none" href="#!" data-list-view="less">View Less<svg className="svg-inline--fa fa-angle-right ms-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style={{transformOrigin: "0.3125em 0.5625em"}}><g transform="translate(160 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" transform="translate(-160 -256)"></path></g></g></svg></a>
                </div>
                <div className="col-auto d-flex"><button className="page-link disabled" data-list-pagination="prev" disabled=""><svg className="svg-inline--fa fa-chevron-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg></button>
                  <ul className="mb-0 pagination d-flex gap-1">
                    <li className="active">
                        <button className="btn btn-primary page" type="button" data-i="1" data-page="10">1</button></li>
                    <li>
                        <button className="btn page" type="button" data-i="2" data-page="10">2</button></li>
                    </ul><button className="page-link pe-0" data-list-pagination="next"><svg className="svg-inline--fa fa-chevron-right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg></button>
                </div>
              </div>
            </div>
                </div>
            </div>
        </>
    )
}

export default ListProducts;