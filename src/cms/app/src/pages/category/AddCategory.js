import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import slugify from "slugify";

function AddCategory() {
    const editorRef = useRef(null);
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

    // Render slug when input in name category
    const handleChangeInputname = (event) => {
        let name = event.target.value
        const slug = slugify(name, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            trim: true,  // Trim leading/trailing spaces
        });

        const nameInput = document.getElementById('slug-category')
        nameInput.value = slug
    }

    // Handle click add category
    const handleAddCategory = (event) => {
        event.preventDefault()

        const name = document.getElementById('name-category').value
        const slug = document.getElementById('slug-category').value
        const description = editorRef.current.getContent({format: "text"})
        let parentId = document.getElementById('parent-category').value

        let category = {
            name, slug, description
        }
        if (parentId !== "none") {
            category.parentId = parseInt(parentId)
        }

        console.log(category)
    }

    return (
        <>
            <Header/>
            <Panel/>
            <div className="content">
                <form className="add-product-content mb-9">
                    <div className="d-flex justify-content-between mb-5">
                        <div className="add-product-header-left">
                            <h1 className="fw-bold">Add a category</h1>
                            <span>Orders placed across your store</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <button type="button" class="btn btn-primary" onClick={handleAddCategory}>Publish category</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <h4 className="mb-3">Category Name</h4>
                            <input type="text" className="form-control mb-5" placeholder="Write name here..." onChange={handleChangeInputname} id="name-category"></input>
                            <h4 className="mb-3">Slug</h4>
                            <input type="text" className="form-control mb-5" id="slug-category" readOnly></input>
                            <div className="mb-5">
                                <h4 className="mb-3">Category Description</h4>
                                <Editor
                                    id="description-category"
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
                        </div>
                        <div className="col-4">
                            <div className="row g-2">
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4 fw-normal">Options</h4>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 me-2 fs-6 text-body-highlight">Parent Category</h5>
                                                        </div>
                                                        <select className="form-select mb-3" id="parent-category">
                                                            <option value="none">none</option>
                                                            { categories.map((item, index) => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                        </select>
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

export default AddCategory;