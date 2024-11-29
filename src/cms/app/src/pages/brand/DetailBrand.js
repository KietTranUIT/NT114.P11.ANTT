import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { getBrand, updateLogoBrand, updateBrand } from "./../../helpers";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import Modal from "./../../components/modal/modal"


function DetailBrand({ brandId }) {
    const editorRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false)
    const [isUpload, setIsUpload] = useState(false)
    const [preview, setPreview] = useState({pr: false, url: ''})
    const [upload, setUpload] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ type: '', title: '', message: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)

    // Init a category
    const [brand, setBrand] = useState({
        id: '',
        name: "",
        description: "",
        slug: "",
        logo: "",
        createdAt: "",
        updatedAt: "",
        productCount: 0,
    })

    useEffect(() => {
        const fetchBrand = async () => {
            const result1 = await getBrand(brandId)
            setBrand(result1.data)
            console.log(result1.data)
        }
        fetchBrand()
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

    // Handle update brand
    const handleUpdateBrand = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        let updateParams = {}
        let name = document.getElementById('name-category').value
        if (name == '') {
            name = brand.name
        }
        if (name != brand.name) {
            updateParams.name = name
        }

        const slug = document.getElementById('slug-category').value
        if (slug != brand.slug) {
            updateParams.slug = slug
        }

        const description = editorRef.current.getContent({format: "text"})
        if (description != brand.description) {
            updateParams.description = description
        }

        const result = await updateBrand(brand.id, updateParams)
        setIsLoading(false)
        // Check if error
        if (result.status === 422) {
            const errors = result.response.data.errors
            errors.forEach(err => {
                if (err.source.pointer === '/name') {
                    setModalContent({ type: "error", title: "Lỗi",message: "Tên của thương hiệu đã tồn tại. Vui lòng chọn một tên khác"})
                    setIsShowModal(true)
                } else {
                    setModalContent({ type: "error", title: "Lỗi",message: "Slug của thương hiệu đã tồn tại. Vui lòng chọn một slug khác"})
                    setIsShowModal(true)
                }
            });
        } else {
            setBrand(result.data[0])
            setModalContent({ type: 'success', title: 'Thành công', message: 'Thương hiệu đã được cập nhật!'})
            setIsShowModal(true)
            setIsEdit(false)
        }
        
    }

    // Close preview card
    const handleClosePreviewCard = () => {
        setPreview({ pr: false, url: ''})
    }

    // When drag file
    const handleOnDropFile = (acceptedFiles) => {
        let selectedFile = acceptedFiles[0]
        setPreview({ pr: true, url: URL.createObjectURL(selectedFile) })
        setUpload(selectedFile)
    }

    // Handle update image
    const handleEditUpload = () => {
        setIsUpload(true)
    }

    const handleCancelUpload = () => {
        setIsUpload(false)
    }

    const handleUploadLogoBrand = async (event) => {
        setIsLoadingUpload(true)
        event.preventDefault()

        const data = new FormData()
        data.append("file", upload)

        const result = await updateLogoBrand(brandId, data)
        setIsLoadingUpload(false)
        if (result.status == 422) {
            setModalContent({ type:'error', title:'Lỗi',message:`${result.response.data.errors[0]}`})
            setIsShowModal(true)
            setIsUpload(false)
            return
        }
        setBrand(result.data[0])
        setIsUpload(false)
        setModalContent({ type:'success', title:'Thành công',message:`Hình ảnh được tải lên thành công!`})
        setIsShowModal(true)
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
                            <h1 className="fw-bold" style={{ color:"#007bff"}}>Thương hiệu</h1>
                            <span className="fw-bold" >Brand id: #{brand.id}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            { !isEdit ? (
                                <>
                                <button className="btn btn-primary d-flex gap-2 align-items-center" onClick={handleEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
                                    Chỉnh sửa
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
                                            <button type="button" class="btn btn-primary" onClick={handleUpdateBrand}>Cập nhật</button>
                                            <button className="btn btn-secondary" onClick={handleCancel}>Hủy bỏ</button>
                                        </>
                                    )}
                                    
                                </>
                            )}
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mb-3">Tên thương hiệu</h4>
                            { isEdit ? (
                                <>
                                    <input type="text" className="form-control mb-5" id="name-category" data-name={brand.name} placeholder={brand.name} onChange={handleChangeInputName}></input>
                                    <span className="text-danger d-none" id="name-category-error">error</span>
                                </>
                            ) : (
                                <input type="text" className="form-control mb-5" id="name-category" value={brand.name} readOnly></input>
                            )}
                            <h4 className="mb-3">Slug</h4>
                            <input type="text" className="form-control mb-5" id="slug-category" value={brand.slug} readOnly></input>
                            <span className="text-danger d-none" id="slug-category-error">error</span>
                            <div className="mb-5">
                                <h4 className="mb-3">Mô tả</h4>
                                { isEdit ? (
                                    <Editor
                                    id="description-category"
                                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={`<p>${brand.description}</p>`}
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
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={brand.description} readOnly style={{height: "200px"}}></textarea>
                                    </div>
                                )}
                                <div className="mt-3 d-flex gap-4 mb-3">
                                    <h4 className="">Hình ảnh logo</h4>
                                    { !isUpload ? (
                                        <button className="btn btn-primary d-flex gap-2 align-items-center" onClick={handleEditUpload}>
                                            Thay đổi
                                        </button>
                                    ) : (
                                        <>
                                            { isLoading ? (
                                                <button class="btn btn-primary d-flex gap-1 align-items-center" type="button" disabled>
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span class="sr-only">Đang lưu...</span>
                                                </button>
                                            ) : (
                                            <>
                                                <button type="button" class="btn btn-primary" onClick={handleUploadLogoBrand}>Tải lên</button>
                                                <button className="btn btn-secondary" onClick={handleCancelUpload}>Hủy bỏ</button>
                                            </>
                                            )}
                                            
                                        </>
                                    )}
                                </div>
                                <div className="dropzone mb-5">
                                    { !isUpload ? (
                                        <div className="dropzone-preview mb-2">
                                            <div className="preview-card p-4 bg-white">
                                                <img src={brand.logo} width="100px" height="100px"></img>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                
                            
                            </div>
                                
                            </div>
                        </div>
                    </div>
                </form>
        </>
    )
}

export default DetailBrand;