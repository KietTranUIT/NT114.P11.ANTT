import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import { getCategories, createCategory, createBrand } from "./../../helpers";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Modal from "../../components/modal/modal";


function AddBrand() {
    const editorRef = useRef(null)
    const [preview, setPreview] = useState({pr: false, url: ''})
    const [upload, setUpload] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ type: '', title: '', message: ''})
    const [isLoading, setIsLoading] = useState(false)

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

    // Handle click add brand
    const handleAddBrand = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        const name = document.getElementById('name-category').value
        const slug = document.getElementById('slug-category').value
        const description = editorRef.current.getContent({format: "text"})
        let brand = {
            name, slug, description
        }

        const data = new FormData()
        data.append('brand', JSON.stringify(brand))
        if (upload == '') {
            setModalContent({ type: "error", title: "Lỗi",message: "Vui lòng chọn một file hình ảnh!"})
            setShowModal(true)
            return
        }
        data.append('file', upload)

        // Send request create category
        const result = await createBrand(data)
        setIsLoading(false)
        // Check if error
        if (result.status === 422) {
            const errors = result.response.data.errors
            errors.forEach(err => {
                if (err.source.pointer === '/brand/name') {
                    setModalContent({ type: "error", title: "Lỗi",message: "Tên của thương hiệu đã tồn tại. Vui lòng chọn một tên khác!"})
                    setShowModal(true)
                } else {
                    setModalContent({ type: "error", title: "Lỗi",message: "Slug của thương hiệu đã tồn tại. Vui lòng chọn một slug khác"})
                    setShowModal(true)
                }
            });
            return
        }

        // If success
        setModalContent({ type: "success", title: "Thành công",message: "Thương hiệu đã tạo thành công"})
        setShowModal(true)
    }

    // Handle remove error alert
    const handleRemoveErrorAlert = (event) => {
        const id = event.target.id
        document.getElementById(id).classList.remove('border-danger')
        document.getElementById(id + '-error').classList.add('d-none')
    }

    // When drag file
    const handleOnDropFile = (acceptedFiles) => {
        let selectedFile = acceptedFiles[0]
        setPreview({ pr: true, url: URL.createObjectURL(selectedFile) })
        setUpload(selectedFile)
    }

    // Close preview card
    const handleClosePreviewCard = () => {
        setPreview({ pr: false, url: ''})
    }

    return (
        <>
        { showModal && (
            <Modal handleCloseModal={() => setShowModal(false)} 
                message={modalContent.message} 
                title={modalContent.title}
                type={modalContent.type}
                />
        )}
        <form className="add-product-content mb-9">
            {showModal && (
                <div className="modal-backdrop fade show"></div>
            )}
            <div className="d-flex justify-content-between mb-5">
                <div className="add-product-header-left">
                    <h1 className="fw-bold" style={{ color:"#007bff"}}>Thêm thương hiệu</h1>
                </div>
                <div className="d-flex align-items-center gap-2">
                    { isLoading ? (
                        <button class="btn btn-primary d-flex gap-1 align-items-center" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Đang lưu...</span>
                        </button>
                    ) : (
                        <button type="button" class="btn btn-primary" onClick={handleAddBrand}>Tạo</button>
                    )}
                    
                </div>
            </div>
            <div className="row">
                    <div className="col-12">
                        <h4 className="mb-3">Tên thương hiệu <span style={{color:"red"}}>*</span></h4>
                        <div className="mb-5">
                            <input type="text" className="form-control" placeholder="Write name here..." onClick={handleRemoveErrorAlert} onChange={handleChangeInputname} id="name-category"></input>
                            <span className="text-danger d-none" id="name-category-error">error</span>
                        </div>
                        <h4 className="mb-3">Slug <span style={{color:"red"}}>*</span></h4>
                        <div className="mb-5">
                            <input type="text" className="form-control mb-5" id="slug-category" readOnly onClick={handleRemoveErrorAlert}></input>
                            <span className="text-danger d-none" id="slug-category-error">error</span>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-3">Mô tả</h4>
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
                                    }}/>
                        </div>
                        <h4 className="mb-3">Hình ảnh logo <span style={{color:"red"}}>*</span></h4>
                        <div className="dropzone mb-5">
                            <div className={ preview.pr ? "dropzone-preview mb-2" : "dropzone-preview mb-2 d-none"}>
                                <div className="preview-card p-4 bg-white">
                                    <img src={preview.url} width="60px" height="60px"></img>
                                    <button type="button" class="btn-close" aria-label="Close" style={{position:"absolute",right:"0",top:"0",width:"7px",height:"7px"}} onClick={handleClosePreviewCard}></button>
                                </div>
                            </div>
                            <Dropzone onDrop={handleOnDropFile} multiple={false} accept={"image/png"}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()} className="row">
                                            <div className="dropzone-items col-12 p-5 d-flex flex-column align-items-center gap-2">
                                                <div className="d-flex justify-content-center align-items-center flex-column">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        Drag your photos or
                                                        <a className="text-decoration-none btn btn-link p-0">Browse from device</a>
                                                    </div>
                                                    <input {...getInputProps()}/>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="60px" height="60px" opacity={0.7}>
                                                        <path d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            </div>
                                    </section>
                                )}
                            </Dropzone>
                            </div>
                        </div>
                    </div>
        </form>
        </>
    )
}

export default AddBrand;