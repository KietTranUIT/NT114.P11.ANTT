import { useState } from "react"

function Modal({ handleCloseModal, message, title, type}) {
    return (
        <>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" style={{ color: type === 'success' ? 'green':'red'}}>{title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => handleCloseModal()}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p style={{ color: type === 'success' ? 'green':'red'}}>{message}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleCloseModal()}
                  >
                    Đóng
                  </button>
                  { type === 'success' && (
                        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
                            Quay lại trang chủ
                        </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </>
    )
}

export default Modal;