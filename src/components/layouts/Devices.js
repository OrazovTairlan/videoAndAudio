import React, {Component} from 'react';

class Devices extends Component {
    render() {
        return (
            <div className="devices">
                <div class="devices-title">
                    Проверка компьютера
                </div>
                <div class="devices-row">
                    <div class="devices-item">
                        <img src = "../../images/device-success.svg" className="devices-item__image"/>
                        <p class="devices-item__title">
                            Подключение
                            веб-камеры
                        </p>
                        <p class="devices-item__status">
                            Успешно
                        </p>
                        <button class="devices-repeat btn">
                            <img src="../../images/button-again.svg" alt="" class="devices-repeat-img"/> <span class="devices-repeat-text">Начать заново</span>
                        </button>
                    </div>
                    <div className="devices-item">
                        <img src="../../images/device-success.svg" className="devices-item__image"/>
                        <p className="devices-item__title">
                            Подключение
                            веб-камеры
                        </p>
                        <p className="devices-item__status">
                            Успешно
                        </p>
                        <button className="devices-repeat btn">
                            <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/> <span
                            className="devices-repeat-text">Начать заново</span>
                        </button>
                    </div>
                    <div className="devices-item">
                        <img src="../../images/device-success.svg" className="devices-item__image"/>
                        <p className="devices-item__title">
                            Подключение
                            веб-камеры
                        </p>
                        <p className="devices-item__status">
                            Успешно
                        </p>
                        <button className="devices-repeat btn">
                            <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/> <span
                            className="devices-repeat-text">Начать заново</span>
                        </button>
                    </div>
                    <div className="devices-item">
                        <img src="../../images/device-success.svg" className="devices-item__image"/>
                        <p className="devices-item__title">
                            Подключение
                            веб-камеры
                        </p>
                        <p className="devices-item__status">
                            Успешно
                        </p>
                        <button className="devices-repeat btn">
                            <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/> <span
                            className="devices-repeat-text">Начать заново</span>
                        </button>
                    </div>
                </div>
                <div class="devices-button-next">
                    <button class="devices-button btn-disabled btn">
                        Далее
                    </button>
                </div>
            </div>
        );
    }
}

export default Devices;