function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    //window.removeEventListener('scroll', openModalByScroll);
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = "none";
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal

    const modalButtons = document.querySelectorAll(triggerSelector),
        modalClose = document.querySelector('.modal__close'),
        modal = document.querySelector(modalSelector);

    modalButtons.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalClose.addEventListener('click', () => {
        closeModal(modalSelector);
    });

    document.addEventListener('click', (evt) => {
        if (evt.target == modal) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape') {
            closeModal(modalSelector);
        }
    });

    //window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {
    closeModal
};
export {
    openModal
};