import React, {Component} from 'react';

class DialogConfirm extends Component {
    render() {
        const {handleClose, handleConfirmClose} = this.props;
        return (
            <div className="dialog-confirm">
                <div class="dialog-title">
                    Вы точно хотите завершить тестирование?
                </div>
                <div class="dialog-agree">
                    <button onClick={handleClose} class="dialog-agree-button">Да</button>
                </div>
                <div class="dialog-disagree">
                    <button onClick={handleConfirmClose} class="dialog-disagree-button">Нет</button>
                </div>
            </div>
        );
    }
}

export default DialogConfirm;