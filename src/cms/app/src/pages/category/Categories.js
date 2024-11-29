import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect } from "react";
import { formatTimeStamp, getCategories, removeCategory, removeCategories, searchCategory } from "./../../helpers";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"
import AddCategory from "./AddCategory";
import DetailCategory from "./DetailCategory";
import Modal from "../../components/modal/modal";
import Loading from "../../components/loading/loading";
import Backpage from "../../components/backpage/backpage";


function Categories() {
    const navigate = useNavigate()
    const viewDefault = 10
    const [viewLess, setViewLess] = useState(false)
    const [categories, setCategories] = useState([])
    const [sliceItems, setSliceItems] = useState({
        start: 0,
        end: (categories.length < 10) ? categories.length : viewDefault
    })
    const [page, setPage] = useState('category')
    const [indexCategory, setIndexCategory] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ type: '', title: '', message: ''})

    // Loading list categories access page
    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            const result = await getCategories()
            if (!(result instanceof Error)) {
                setCategories(result.data)
                setSliceItems({...sliceItems, end: (result.data.length < 10) ? result.data.length : viewDefault})
            }
        }
        fetchCategories()
        setIsLoading(false)
    },[])

    // Handle when user click view less
    const handleViewLess = () => {
        setViewLess(false);
        setSliceItems({...sliceItems, end: (categories.length < 10) ? categories.length : viewDefault})
    }

    // Handle when user click view all
    const handleViewAll = () => {
        setViewLess(true);
        setSliceItems({...sliceItems, end: categories.length})
    }

    // Navigate to add category page when click
    const handleAddCategory = () => {
        //navigate('/categories/add')
        setPage('addcategory')
    }

    // Handle click on edit category
    const handleEditCategory = (event) => {
        const categoryId = event.currentTarget.dataset.id
        setIndexCategory(categoryId)
        setPage('detailcategory')
        //navigate(`/categories/${categoryId}`)
    }

    // Handle click on remove category
    const handleRemoveCategory = async (event) => {
        const categoryId = event.currentTarget.dataset.id
        
        // remove category api
        const result = await removeCategory(categoryId)
        if (result.status != 200) {
            setModalContent({ type:'error', title:'Lỗi', message:`${result.response.data.errors[0].detail}`})
            setShowModal(true)
        } else {
            setModalContent({ type:'success', title:'Thành công', message:`Danh mục #${categoryId} đã xóa thành công!`})
            setShowModal(true)
        }
        
    }

    // Handle remove selected categories
    const handleRemoveSelectedCategories = async (event) => {
        event.preventDefault()

        const inputs = document.getElementsByClassName('select-remove-input')
        let selected = []
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                selected.push(inputs[i].value)
            }
        }
        if (selected.length <= 0) {
            alert('Please select a category to delete')
        } else {
            const result = await removeCategories(selected)
            if (result.status == 200) {
                alert('delete successfully')
                window.location.reload()
            } else {
                alert(result.response.data.errors[0].detail)
            }
        }
    }

    // Handle click on input check all
    const handleInputCheckAll = (event) => {
        const inputs = document.getElementsByClassName('select-remove-input')

        if (event.currentTarget.checked) {
            for (const input of inputs) {
                input.checked = true
            }
            return
        }
        for (const input of inputs) {
            input.checked = false
        }
    }

    const handleSearch = async (query) => {
        const result = await searchCategory(query)
        if (!(result instanceof Error)) {
            if (result.data.length <= 0) {
                setCategories([])
            } else {
                setCategories(result.data)
            }
            setSliceItems({...sliceItems, end: (result.data.length < 10) ? result.data.length : viewDefault})
        }
    }

    const debouncedSearch = debounce(handleSearch, 500)

    // Search category
    const handleSearchChange = (event) => {
        debouncedSearch(event.target.value)
    }

    return (
        <>
        { isLoading ? (
            <Loading />
        ) : (
            <>
            { showModal && (
                <Modal handleCloseModal={() => setShowModal(false)} 
                    message={modalContent.message} 
                    title={modalContent.title}
                    type={modalContent.type}
                    />
            )}
                <Header />
                <Panel navId={'categories-nav'}/>
                <div className="content">                    
                {showModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
                    { !(page === 'category') ? (
                        <>
                            <Backpage handleOnBack={() => setPage('category')}/>
                            { (page === 'addcategory') ? (
                                <AddCategory data={categories}/>
                            ):(
                                <DetailCategory categoryId={indexCategory}/>
                            ) }
                        </>
                    ) : (
                        <>
                            <div className="mb-5">
                        <div className="mb-4">
                            <h2 className="fw-bold" style={{ color:"#007bff"}}>Danh mục sản phẩm</h2>
                        </div>
                        <ul className="nav nav-links mx-n3 mb-3">
                        <li className="nav-item">
                            <a className="pl-0 text-decoration-none text-dark" style={{fontSize: "13px"}} aria-current="page" href="#">
                                <span style={{ color:"#007bff"}}>Tất cả </span>
                                <span style={{ color:"#007bff"}}>({categories.length})</span>
                            </a>
                        </li>
                    </ul>
                    <div id="products">
                        <div className="mb-4">
                            <div className="d-flex justify-content-between">
                            <div className="search-box">
                                    <form id="form1">
                                        <div className="input-group d-flex flex-column">
                                            <div className="d-flex align-items-center position-relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px" height="16px" className="position-absolute ms-3">
                                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                                </svg>
                                                <input type="search" id="search-input" className="form-control" placeholder="Tìm kiếm danh mục sản phẩm" onChange={handleSearchChange}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-danger" onClick={handleRemoveSelectedCategories}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                                        <span className="fw-bold">+ </span>Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{fontSize:"13px"}} className="tablezone bg-white border-top border-bottom border-translucent position-relative top-1">
                            <div className="table-responsive scrollbar">
                                <table className="table fs-9 mb-0">
                                    <thead>
                                        <tr className="" style={{fontSize:"13px"}}>
                                            <th className="white-space-nowrap fs-9 align-middle pl-1" style={{maxWidth:"20px",width:"18px"}}>
                                                <div className="form-check mb-0 fs-8">
                                                    <input className="form-check-input" id="checkbox-bulk-products-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;products-table-body&quot;}" onClick={handleInputCheckAll}/>
                                                </div>
                                            </th>
                                            <th className="sort white-space-nowrap align-middle ps-4" scope="col" style={{width:"150px"}} data-sort="product">TÊN DANH MỤC</th>
                                            <th className="sort white-space-nowrap align-middle ps-4" scope="col" style={{width:"150px"}} data-sort="product">SLUG</th>
                                            <th className="sort align-middle" scope="col" data-sort="price" style={{width:"395px"}}>MÔ TẢ</th>
                                            <th className="sort" scope="col" data-sort="tags" style={{width:"155px"}}>LẦN CUỐI CẬP NHẬT</th>
                                            <th className="sort fs-8" scope="col" style={{width:"155px"}}>NGÀY TẠO</th>
                                            <th className="sort text-end align-middle pe-0 ps-4" scope="col"></th>
                                        </tr>
                                    </thead>
                      <tbody className="list" id="products-table-body">
                      { categories.slice(sliceItems.start, sliceItems.end).map((item, index) => (
                            <tr className="position-static">
                                
                            <td className="fs-9 align-middle">
                              <div className="form-check mb-0 fs-8">
                                <input value={item.id} className="form-check-input select-remove-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...&quot;,&quot;productImage&quot;:&quot;/products/1.png&quot;,&quot;price&quot;:&quot;$39&quot;,&quot;category&quot;:&quot;Plants&quot;,&quot;tags&quot;:[&quot;Health&quot;,&quot;Exercise&quot;,&quot;Discipline&quot;,&quot;Lifestyle&quot;,&quot;Fitness&quot;],&quot;star&quot;:false,&quot;vendor&quot;:&quot;Blue Olive Plant sellers. Inc&quot;,&quot;publishedOn&quot;:&quot;Nov 12, 10:45 PM&quot;}" /></div>
                            </td>
                            <td className="product align-middle ps-4"><a className="fw-semibold line-clamp-3 mb-0" href="../../../apps/e-commerce/landing/product-details.html">{item.name}</a></td>
                            <td className="product align-middle ps-4">{item.slug}</td>
                            <td className="align-middle white-space-nowrap text-body-quaternary fs-9 fw-semibold">{item.description}</td>
                            <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85">{formatTimeStamp(item.updatedAt)}</td>
                            <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85">{formatTimeStamp(item.createdAt)}</td>
                            <td className="d-flex gap-2">
                              <button className="btn btn-primary" data-id={item.id} onClick={handleEditCategory}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>
                              </button>
                              <button className="btn btn-danger" data-id={item.id} onClick={handleRemoveCategory}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                    </table>
                  </div>
                  <div className="row align-items-center justify-content-between py-2 pe-0 fs-9">
                    <div className="col-auto d-flex align-items-center">
                      <p className="mb-0 d-none d-sm-block me-3 fw-semibold text-body" data-list-info="data-list-info">Total items: {categories.length}</p>
                        { viewLess ? (    
                            <a className="fw-semibold" href="#" onClick={handleViewLess} data-list-view="less">
                                View less<svg width="7px" className="svg-inline--fa fa-angle-right ms-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style={{transformOrigin: "0.3125em 0.5625em"}}><g transform="translate(160 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" transform="translate(-160 -256)"></path></g></g></svg>
                            </a>
                        ):(
                            <a className="fw-semibold text-decoration-none" href="#" onClick={handleViewAll} data-list-view="*">
                                View all<svg width="7px" className="svg-inline--fa fa-angle-right ms-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style={{transformOrigin: "0.3125em 0.5625em"}}><g transform="translate(160 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" transform="translate(-160 -256)"></path></g></g></svg>
                            </a>
                        )
                        }
                        
                    </div>
                  </div>
                </div>
                    </div>
                    </div>
                        </>
                    )}
                </div>
            </>
        )}
        </>
    )
}

export default Categories;