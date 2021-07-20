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
                        <img src = "../../images/device-success.svg"/>
                        <p class="devices-item__text">
                            Подключение
                            веб-камеры
                        </p>
                        <p class="devices-item__status">
                            Успешно
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Devices;