import './panel.css';
import { useEffect } from 'react';

function Panel({ navId }) {

    useEffect(() => {
        const handleFixedNav = () => {
            const navItem = document.getElementById(navId)
            navItem.style.borderRight = '4px solid #007bff'
            navItem.style.color = '#007bff'
            navItem.dataset.fixed = true
            const aTag = navItem.querySelector('a')
            aTag.style.color = '#007bff'
        }
        handleFixedNav()
    }, [])
    // Handle hover on nav items
    const handleHoverOn = (event) => {
        const item = event.currentTarget

        if (item.dataset.fixed) {
            return
        }

        // Change color
        item.style.borderRight = '4px solid #007bff'
        item.style.color = '#007bff'

        const aTag = item.querySelector('a')
        aTag.style.color = '#007bff'
    }

    // Handle hover leave nav items
    const handleHoverLeave = (event) => {
        const item = event.currentTarget

        if (item.dataset.fixed) {
            return
        }

        // Change color
        item.style.borderRight = '0px solid white'
        item.style.color = 'black'

        const aTag = item.querySelector('a')
        aTag.style.color = 'black'
    }
    return (
        <div className="panel">
            <div className="panel-header">
                <a id="logo">TechStore</a>
            </div>
            <div className="panel-content">
                <ul>
                    <li id="dashboard-nav" style={{color:"black"}} className="d-flex gap-3 align-items-center p-3 panel-items" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="bi bi-house" width="20px" height="20px">
                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                        </svg>
                        <a href="/" className="p-0 fw-bold" style={{color:"black"}}>Dashboard</a>
                    </li>
                    <li id="categories-nav" style={{color:"black"}} className="d-flex gap-3 align-items-center p-3 panel-items" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="bi bi-house" width="20px" height="20px">
                            <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/>
                        </svg>
                        <a href="/categories" className="p-0 fw-bold" style={{color:"black"}}>Danh mục</a>
                    </li>
                    <li id="brands-nav" style={{color:"black"}} className="d-flex gap-3 align-items-center p-3 panel-items" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="bi bi-house" width="20px" height="20px">
                            <path d="M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </svg>
                        <a href="/brands" className="p-0 fw-bold" style={{color:"black"}}>Thương hiệu</a>
                    </li>
                    {/* <li id="orders-nav" style={{color:"black"}} className="d-flex gap-3 align-items-center p-3 panel-items" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="bi bi-house" width="20px" height="20px">
                            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                        </svg>
                        <a href="/orders" className="p-0 fw-bold" style={{color:"black"}}>Orders</a>
                    </li> */}
                    <li id="products-nav" style={{color:"black"}} className="d-flex gap-3 align-items-center p-3 panel-items" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="bi bi-house" width="20px" height="20px">
                            <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                        <a href="/products" className="p-0 fw-bold" style={{color:"black"}}>Sản phẩm</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Panel;