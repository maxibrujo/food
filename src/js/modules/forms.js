import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Р”Р°РЅРЅС‹Рµ Р·Р°РіСЂСѓР¶РµРЅС‹!',
        failure: 'Р§С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            // const object = {};

            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            // request.send(formData);
            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch((err) => {
                    console.log(err);
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        // setTimeout(60000);
        // prevModalDialog.classList.add('hide');
        prevModalDialog.style.display = 'none';

        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal_dialog');
        thanksModal.innerHTML = `
    <div class = "modal__content">
    <div class = "modal__close">Г—</div>
    <div class = "modal__title">${message}</div>
    </div>
    `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            // prevModalDialog.classList.add('show');
            prevModalDialog.style.display = 'block';
            // prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;