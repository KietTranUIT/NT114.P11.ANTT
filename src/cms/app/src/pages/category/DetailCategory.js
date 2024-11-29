import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { getCategory, getCategories, updateCategory } from "./../../helpers";
import slugify from "slugify";
import Modal from "./../../components/modal/modal";
function DetailCategory({ categoryId }) {
    const editorRef = useRef(null);
    const [isSuccess, setIsSuccess] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [categories, setCategories] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ type: '', title: '', message: ''})
    const [isLoading, setIsLoading] = useState(false)
    // Init a category
    const [category, setCategory] = useState({
        id: '',
        name: "",
        description: "",
        slug: "",
        parentId: 0,
        icon: null,
        createdAt: "",
        updatedAt: "",
        productCount: 0,
        category: {}
    })

    useEffect(() => {
        const fetchCategory = async () => {
            const result1 = await getCategory(categoryId)
            console.log(result1)
            setCategory(result1.data)

            const result2 = await getCategories()
            let indexs = []
            for (let i = 0; i < result2.data.length; i++) {
                if (indexs.length == 2) {
                    break
                }

                if (result2.data[i].id == result1.data.id || (result1.data.category != null && result2.data[i].id == result1.data.category.id)) {
                    indexs.push(i)
                }
            }
            let dataCategories = result2.data.filter((item, index) => !indexs.includes(index))
            setCategories(dataCategories)
        }
        fetchCategory()
    }, [])  
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

    // Handle change input name
    const handleChangeInputName = (event) => {
        let name = event.target.value
        const slug = slugify(name, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            trim: true,  // Trim leading/trailing spaces
        });

        const slugInput = document.getElementById('slug-category')
        slugInput.value = slug
    }

    // Handle update category
    const handleUpdateCategory = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        let updateParams = {}
        let name = document.getElementById('name-category').value
        if (name == '') {
            name = category.name
        }
        if (name != category.name) {
            updateParams.name = name
        }

        const slug = document.getElementById('slug-category').value
        if (slug != category.slug) {
            updateParams.slug = slug
        }

        const description = editorRef.current.getContent({format: "text"})
        if (description != category.description) {
            updateParams.description = description
        }

        let parentId = document.getElementById('parent-category').value
        if (parentId != category.parentId) {
            updateParams.parentId = parseInt(parentId)
        }

        const result = await updateCategory(category.id, updateParams)
        // Check if error
        if (result.status === 422) {
            const errors = result.response.data.errors
            errors.forEach(err => {
                if (err.source.pointer === '/name') {
                    setModalContent({ type: "error", title: "Lỗi",message: "Tên của danh mục đã tồn tại. Vui lòng chọn một tên khác"})
                    setIsShowModal(true)
                } else {
                    setModalContent({ type: "error", title: "Lỗi",message: "Slug của danh mục đã tồn tại. Vui lòng chọn một slug khác"})
                    setIsShowModal(true)
                }
            });
        } else {
            setCategory(result.data[0])
            setModalContent({ type: 'success', title: 'Thành công', message: 'Danh mục đã được cập nhật!'})
            setIsShowModal(true)
            setIsEdit(false)
        }
        
    }

     // Handle close success btn
     const handleCloseAlert = (event) => {
        event.preventDefault()
        setIsSuccess(false)
    }

    return (
        <>
        { isShowModal && (
            <Modal handleCloseModal={() => setIsShowModal(false)} 
                message={modalContent.message} 
                title={modalContent.title}
                type={modalContent.type}
                />
        )}
                <form className="add-product-content mb-9">
                {isShowModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
                    <div className="d-flex justify-content-between mb-5">
                        <div className="add-product-header-left">
                            <h1 className="fw-bold" style={{ color:"#007bff"}}>Danh mục sản phẩm</h1>
                            <span className="fw-bold">Category id: #{category.id}</span>
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
                                    { isLoading ? (
                                        <button class="btn btn-primary d-flex gap-1 align-items-center" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span class="sr-only">Đang lưu...</span>
                                        </button>
                                    ) : (
                                        <>
                                            <button type="button" class="btn btn-primary" onClick={handleUpdateCategory}>Cập nhật</button>
                                            <button className="btn btn-secondary" onClick={handleCancel}>Hủy bỏ</button>
                                        </>
                                    )}
                                    
                                </>
                            )}
                            
                        </div>
                    </div>
                    <div className="row">
                    { isSuccess ? (
                            <div className="">
                            <div class="alert alert-success d-flex justify-content-between" role="alert">
                                Product category successfully updated !
                                <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
                            </div>
                        </div>
                        ) : (<></>)}
                        <div className="col-8">
                            <h4 className="mb-3">Tên danh mục</h4>
                            { isEdit ? (
                                <>
                                    <input type="text" className="form-control mb-5" id="name-category" data-name={category.name} placeholder={category.name} onChange={handleChangeInputName}></input>
                                    <span className="text-danger d-none" id="name-category-error">error</span>
                                </>
                            ) : (
                                <input type="text" className="form-control mb-5" id="name-category" value={category.name} readOnly></input>
                            )}
                            <h4 className="mb-3">Slug</h4>
                            <input type="text" className="form-control mb-5" id="slug-category" value={category.slug} readOnly></input>
                            <span className="text-danger d-none" id="slug-category-error">error</span>
                            <div className="mb-5">
                                <h4 className="mb-3">Mô tả</h4>
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
                                        <textarea style={{height:"200px"}} className="form-control" id="exampleFormControlTextarea1" rows="3" value={category.description} readOnly></textarea>
                                     </div>
                                )}
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row g-2">
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4 fw-normal">Danh mục cha</h4>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="mb-4">
                                                        <div className="d-flex flex-wrap mb-2">
                                                            <h5 className="mb-0 me-2 fs-6 text-body-highlight">Tên danh mục</h5>
                                                        </div>
                                                        { !isEdit ? (
                                                            <input type="text" className="form-control mb-5" id="parent-category" value={category.category ? category.category.name : null} readOnly></input>
                                                        ) : (
                                                            <select className="form-select mb-3" id="parent-category">
                                                            { category.category ? (
                                                                <option value={category.category.id}>{category.category.name}</option>
                                                            ) : (
                                                                <option value='null'></option>
                                                            )}
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
        </>
    )
}

export default DetailCategory;