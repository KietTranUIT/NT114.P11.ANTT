import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import "./addproduct.css";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Dropzone from "react-dropzone";

function AddProduct() {
    const editorRef = useRef(null);
    return (
        <>
            <Header />
            <Panel />
            {/* <div className="editor_wrap">
                <div className="editor">
                    <div className="form"></div>
                </div>
            </div> */}
            <div className="content">
                <form className="add-product-content mb-9">
                    <div className="d-flex justify-content-between mb-5">
                        <div className="add-product-header-left">
                            <h1>Add a product</h1>
                            <span>Orders placed across your store</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <button type="button" class="btn btn-outline-secondary">Discard</button>
                            <button type="button" class="btn btn-outline-primary">Save draft</button>
                            <button type="button" class="btn btn-primary">Publish product</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <h4 className="mb-3">Product Title</h4>
                            <input type="text" className="form-control mb-5" placeholder="Write title here..."></input>
                            <div className="mb-5">
                                <h4 className="mb-3">Product Description</h4>
                                <Editor
                                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>Write a description here...</p>"
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        resize: false,
                                        plugins: [
                                          'advlist autolink lists link image charmap print preview anchor',
                                          'searchreplace visualblocks code fullscreen',
                                          'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                      }}
                                    />
                            </div>
                            <h4 className="mb-3">Display images</h4>
                            <div className="dropzone mb-5">
                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()} className="row">
            
                                            <div className="col-12 border border-4 pt-3 pb-5 d-flex flex-column align-items-center gap-2">
                                                <div className="d-flex justify-content-center gap-2">
                                                    Drag your photos or
                                                    <button className="btn btn-link p-0">Browse from device</button>
                                                </div>
                                                <input {...getInputProps()}/>
                                                <img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1731904425/public/739249_f2jo15.png" style={{width:"90px",height:"45px"}}/>
                                            </div>
                                            </div>
                                    </section>
                                )}
                            </Dropzone>
                            </div>
                            <h4 className="mb-3">Inventory</h4>
                            <div className="row border-top border-bottom mb-5">
                                <div className="col-4">
                                    <div className="nav d-flex flex-column justify-content-between border-bottom border-end fs-9">
                                        <a className="nav-link border-bottom text-dark cursor-pointer p-3" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag me-sm-2 fs-4 nav-icons"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                        <span>Pricing</span>
                                        </a>
                                        <a className="nav-link border-bottom text-dark cursor-pointer p-3" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package me-sm-2 fs-4 nav-icons"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <span>Restock</span>
                                        </a>
                                        <a className="nav-link border-bottom text-dark cursor-pointer p-3" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package me-sm-2 fs-4 nav-icons"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <span>Shipping</span>
                                        </a>
                                        <a className="nav-link border-bottom text-dark cursor-pointer p-3" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package me-sm-2 fs-4 nav-icons"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <span>Global Delivery</span>
                                        </a>
                                        <a className="nav-link outline-none text-dark p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package me-sm-2 fs-4 nav-icons"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <span>Attributes</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-8"></div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row g-2">
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4 fw-normal">Organize</h4>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 me-2 fs-9 text-body-highlight">Category</h5>
                                                            <a href="#" className="fw-bold d-flex align-items-end" style={{fontSize:"12px"}}>Add a new category</a>
                                                        </div>
                                                        <select className="form-select mb-3">
                                                            <option value="laptop">laptop</option>
                                                            <option value="pc">pc</option>
                                                            <option value="phone">phone</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 text-body-highlight me-2">Tags</h5>
                                                            <a href="#" className="fw-bold d-flex align-items-end" style={{fontSize:"12px"}}>View all tags</a>
                                                        </div>
                                                        <select className="form-select mb-3">
                                                            <option value="laptop">laptop</option>
                                                            <option value="pc">pc</option>
                                                            <option value="phone">phone</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4 fw-normal">Variants</h4>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 me-2 fs-9 text-body-highlight">Option 1</h5>
                                                            <a href="#" className="fw-bold d-flex align-items-end" style={{fontSize:"12px"}}>Remove</a>
                                                        </div>
                                                        <select className="form-select mb-3">
                                                            <option value="laptop">laptop</option>
                                                            <option value="pc">pc</option>
                                                            <option value="phone">phone</option>
                                                        </select>
                                                        <input type="text" class="form-control" placeholder="Value"></input>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 text-body-highlight me-2">Option 2</h5>
                                                            <a href="#" className="fw-bold d-flex align-items-end" style={{fontSize:"12px"}}>Remove</a>
                                                        </div>
                                                        <select className="form-select mb-3">
                                                            <option value="laptop">laptop</option>
                                                            <option value="pc">pc</option>
                                                            <option value="phone">phone</option>
                                                        </select>
                                                        <input type="text" class="form-control" placeholder="Value"></input>
                                                    </div>
                                                </div>
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-primary" type="button">Add another option</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProduct;