import React, {Component} from 'react';
import Store from "../../store/store";
import {observer} from "mobx-react";

class Devices extends Component {
    hasGetUserMedia = () => {
        // Note: Opera builds are unprefixed.
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    async componentDidMount() {
        const sleep = time => new Promise(resolve => setTimeout(resolve, time));
        const audioData = [];
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});

        async function playVideo() {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            const video = document.querySelector("video");
            video.srcObject = stream;
            await video.play();
        }

        async function record_and_send() {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            console.log(audioData);
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
            recorder.onstop = e => {
                audioData.push(new Blob(chunks))
                const audioBlob = new Blob(chunks);
                const audioURL = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioURL);
                audio.play();
            };
            setTimeout(() => recorder.stop(), 5000); // we'll have a 5s media file
            recorder.start();
        }

        playVideo(stream);

// generate a new file every 5s
//         setInterval(() => record_and_send(stream), 5000);
    }

    render() {
        return (
            <div className="devices">
                <div class="devices-title">
                    Проверка компьютера
                </div>
                <video autoPlay></video>
                <canvas></canvas>
                <div class="devices-row">
                    <div class="devices-item">
                        <div className="devices-relative">
                            <img src="../../images/device-success.svg" className="devices-item__image"/>
                            <div className="devices-check">
                                <img src="../../images/device-check.svg" alt="" className="devices-check-image"/>
                            </div>
                        </div>
                        <p class="devices-item__title">
                            Подключение
                            веб-камеры
                        </p>
                        <p class="devices-item__status">
                            Успешно
                        </p>
                        <button class="devices-repeat btn">
                            <img src="../../images/button-again.svg" alt="" class="devices-repeat-img"/> <span
                            class="devices-repeat-text">Начать заново</span>
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
                <div class="devices-button-next" onClick={() => Store.currentComponent = "Description"}>
                    <button class="devices-button btn-disabled btn">
                        Далее
                    </button>
                </div>
            </div>
        );
    }
}

export default observer(Devices);