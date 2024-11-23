import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import help from "./../../helpers";

function DetailCategory() {
    const editorRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false)
    const [categories, setCategories] = useState([
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },{
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        }, {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        }, {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        }, {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },{
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },{
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },{
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },{
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        }
    ])
    const [category, setCategory] = useState(
        {
            id: 3,
            name: "Máy tính bảng",
            description: "điện thoại thông minh",
            slug: "djien thoai",
            createdAt: "2024-11-21T05:41:15.290Z",
            updatedAt: "2024-11-21T05:41:15.290Z",
            parentId: null,
            category: null
        },
    )
    // Handle click on edit button
    const handleEdit = (event) => {
        event.preventDefault()
        setIsEdit(true)
    }

    // Handle click on cancel button
    const handleCancel = (event) => {
        event.preventDefault()
        setIsEdit(false)
    }

    // Handle update category
    const updateCategory = (event) => {
        event.preventDefault()
        
        let updateParams = {}
        const name = document.getElementById('name-category').value
        if (name != category.name) {
            updateParams.name = name
        }

        const slug = document.getElementById('slug-category').value
        if (slug) {
            updateParams.slug = slug
        }

        const description = editorRef.current.getContent({format: "text"})
        if (description) {
            updateParams.description = description
        }

        let parentId = document.getElementById('parent-category').value
        if (parentId != category.parentId) {
            updateParams.parentId = parseInt(parentId)
        }


        console.log(updateParams)
    }
    return (
        <>
            <Header/>
            <Panel/>
            <div className="content">
                <form className="add-product-content mb-9">
                    <div className="d-flex justify-content-between mb-5">
                        <div className="add-product-header-left">
                            <h1 className="fw-bold">Category</h1>
                            <span className="fw-bold">#Category id: {category.id}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            { !isEdit ? (
                                <>
                                <button className="btn btn-primary d-flex gap-2" onClick={handleEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
                                </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" class="btn btn-primary" onClick={updateCategory}>Update</button>
                                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                </>
                            )}
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <h4 className="mb-3">Category Name</h4>
                            { isEdit ? (
                                <input type="text" className="form-control mb-5" id="name-category" value={category.name}></input>
                            ) : (
                                <input type="text" className="form-control mb-5" id="name-category" value={category.name} readOnly></input>
                            )}
                            <h4 className="mb-3">Slug</h4>
                            <input type="text" className="form-control mb-5" id="slug-category" value={category.slug} readOnly></input>
                            <div className="mb-5">
                                <h4 className="mb-3">Category Description</h4>
                                { isEdit ? (
                                    <Editor
                                    id="description-category"
                                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={`<p>${category.description}</p>`}
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
                                ) : (
                                    <div class="form-group">
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={category.description} readOnly></textarea>
                                     </div>
                                )}
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row g-2">
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4 fw-normal">Parent Category</h4>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 me-2 fs-6 text-body-highlight">Category name</h5>
                                                        </div>
                                                        { !isEdit ? (
                                                            <input type="text" className="form-control mb-5" id="parent-category" value={category.name} readOnly></input>
                                                        ) : (
                                                            <select className="form-select mb-3" id="parent-category">
                                                            <option value={category.id}>{category.name}</option>
                                                            { categories.map((item, index) => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                            </select>
                                                        )}
                                                    </div>
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

export default DetailCategory;