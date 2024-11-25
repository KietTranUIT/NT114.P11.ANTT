import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import { getCategories, createCategory } from "./../../helpers";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";


function AddCategory({data}) {
    const navigate = useNavigate()
    const editorRef = useRef(null)
    const [categories, setCategories] = useState(data)
    const [isSuccess, setIsSuccess] = useState(false)

    // Loading list categories access page
    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            const result = await getCategories()
            if (!(result instanceof Error)) {
                setCategories(result.data)
            }
        }
        fetchCategories()
    }, [])

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
    const handleAddCategory = async (event) => {
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

        // Send request create category
        const result = await createCategory(category)
        // Check if error
        if (result.status === 422) {
            const errors = result.response.data.errors
            errors.forEach(err => {
                if (err.source.pointer === '/name') {
                    document.getElementById('name-category').classList.add('border-danger')
                    const errAlert = document.getElementById('name-category-error')
                    errAlert.classList.remove('d-none')
                    errAlert.textContent = err.detail
                } else {
                    document.getElementById('slug-category').classList.add('border-danger')
                    const errAlert = document.getElementById('slug-category-error')
                    errAlert.classList.remove('d-none')
                    errAlert.textContent = err.detail
                }
            });
            return
        }

        // If success
        setIsSuccess(true)
        setTimeout(() => {
            navigate('/categories')
        }, 3000)
    }

    // Handle close success btn
    const handleCloseAlert = (event) => {
        event.preventDefault()
        setIsSuccess(false)
    }

    // Handle remove error alert
    const handleRemoveErrorAlert = (event) => {
        const id = event.target.id
        document.getElementById(id).classList.remove('border-danger')
        document.getElementById(id + '-error').classList.add('d-none')
    }

    return (
        <>
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
                        { isSuccess ? (
                            <div className="">
                            <div class="alert alert-success d-flex justify-content-between" role="alert">
                                Product category successfully created !
                                <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
                            </div>
                        </div>
                        ) : (<></>)}
                        <div className="col-8">
                            <h4 className="mb-3">Category Name</h4>
                            <div className="mb-5">
                                <input type="text" className="form-control" placeholder="Write name here..." onClick={handleRemoveErrorAlert} onChange={handleChangeInputname} id="name-category"></input>
                                <span className="text-danger d-none" id="name-category-error">error</span>
                            </div>
                            <h4 className="mb-3">Slug</h4>
                            <div className="mb-5">
                                <input type="text" className="form-control mb-5" id="slug-category" readOnly onClick={handleRemoveErrorAlert}></input>
                                <span className="text-danger d-none" id="slug-category-error">error</span>
                            </div>
                            <div className="mb-5">
                                <h4 className="mb-3">Category Description</h4>
                                <Editor
                                    id="description-category"
                                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                                    onInit={(evt, editor) => editorRef.current = editor}
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
        </>
    )
}

export default AddCategory;