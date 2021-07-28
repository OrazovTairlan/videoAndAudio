import React, {Component} from 'react';
import Store from "../../store/store";
import {observer} from "mobx-react";

class Devices extends Component {
    state = {
        allowedMicrophone: "processing",
        allowedVideoCamera: "processing",
        allowedInternetStatus: "processing"
    }
    hasGetUserMedia = () => {
        // Note: Opera builds are unprefixed.
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    async componentDidMount() {
        const sleep = time => new Promise(resolve => setTimeout(resolve, time));
        const audioData = [];

        const videoCameraStream = navigator.mediaDevices.getUserMedia({video: true})
            .then(stream => this.setState({allowedVideoCamera: true}))
            .catch(e => this.setState({allowedVideoCamera: false}));
        const audioCameraStream = navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => this.setState({allowedMicrophone: true}))
            .catch(e => this.setState({allowedMicrophone: false}));
        const status = await Store.auth();
        if (status == 200) {
            this.setState({allowedInternetStatus: true});
        } else {
            this.setState({allowedInternetStatus: false});
        }
        const videoCameraStatus = await navigator.permissions.query({name: "camera"});
        videoCameraStatus.addEventListener("change", e => {
            navigator.mediaDevices.getUserMedia({video: true})
                .then((stream) => {
                    console.log("on");
                    this.setState({allowedVideoCamera: true});
                })
                .catch(() => {
                    console.log("off");
                    this.setState({allowedVideoCamera: false});
                });
        });
        const audioCameraStatus = await navigator.permissions.query({name: "microphone"});
        audioCameraStatus.addEventListener("change", e => {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(() => {
                    console.log("on");
                    this.setState({allowedMicrophone: true});
                })
                .catch(() => {
                    console.log("off");
                    this.setState({allowedMicrophone: false});
                });
        });

        async function playVideo() {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            const video = document.querySelector("video");
            video.srcObject = stream;
            await video.play();
        }

        // async function record_and_send() {
        //     const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        //     console.log(audioData);
        //     const recorder = new MediaRecorder(stream);
        //     const chunks = [];
        //     recorder.ondataavailable = e => chunks.push(e.data);
        //     recorder.onstop = e => {
        //         audioData.push(new Blob(chunks))
        //         const audioBlob = new Blob(chunks);
        //         const audioURL = URL.createObjectURL(audioBlob);
        //         const audio = new Audio(audioURL);
        //         audio.play();
        //     };
        //     setTimeout(() => recorder.stop(), 5000); // we'll have a 5s media file
        //     recorder.start();
        // }

        // playVideo(stream);

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
                    {this.state.allowedVideoCamera == true ?
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
                        </div> :
                        this.state.allowedVideoCamera == "processing" ?
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image-processing"/>
                                </div>
                                <p className="devices-item__title">
                                    Подключение
                                    веб-камеры
                                </p>
                                <p className="devices-processing">
                                    Идет проверка...
                                </p>
                            </div> :
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image devices-item__image-error"/>
                                    <div className="devices-check devices-check-error">
                                        <img src="../../images/device-error.svg" alt=""
                                             className="devices-check-image"/>
                                    </div>
                                </div>
                                <p className="devices-item__title">
                                    Подключение
                                    веб-камеры
                                </p>
                                <p className="devices-item__status devices-item__status-error">
                                    Ошибка проверки
                                </p>
                                <button className="devices-repeat btn">
                                    <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/>
                                    <span
                                        className="devices-repeat-text">Начать заново</span>
                                </button>
                            </div>}
                    {this.state.allowedMicrophone == true ?
                        <div class="devices-item">
                            <div className="devices-relative">
                                <img src="../../images/device-success.svg" className="devices-item__image"/>
                                <div className="devices-check">
                                    <img src="../../images/device-check.svg" alt="" className="devices-check-image"/>
                                </div>
                            </div>
                            <p class="devices-item__title">
                                Подключение микрофона
                            </p>
                            <p class="devices-item__status">
                                Успешно
                            </p>
                        </div> :
                        this.state.allowedMicrophone == "processing" ?
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image-processing"/>
                                </div>
                                <p className="devices-item__title">
                                    Подключение микрофона
                                </p>
                                <p className="devices-processing">
                                    Идет проверка...
                                </p>
                            </div> :
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image devices-item__image-error"/>
                                    <div className="devices-check devices-check-error">
                                        <img src="../../images/device-error.svg" alt=""
                                             className="devices-check-image"/>
                                    </div>
                                </div>
                                <p className="devices-item__title">
                                    Подключение микрофона
                                </p>
                                <p className="devices-item__status devices-item__status-error">
                                    Ошибка проверки
                                </p>
                                <button className="devices-repeat btn">
                                    <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/>
                                    <span
                                        className="devices-repeat-text">Начать заново</span>
                                </button>
                            </div>}
                    {this.state.allowedInternetStatus == true ?
                        <div class="devices-item">
                            <div className="devices-relative">
                                <img src="../../images/device-success.svg" className="devices-item__image"/>
                                <div className="devices-check">
                                    <img src="../../images/device-check.svg" alt="" className="devices-check-image"/>
                                </div>
                            </div>
                            <p class="devices-item__title">
                                Сетевое
                                соединение
                            </p>
                            <p class="devices-item__status">
                                Успешно
                            </p>
                        </div> :
                        this.state.allowedInternetStatus == "processing" ?
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image-processing"/>
                                </div>
                                <p className="devices-item__title">
                                    Сетевое
                                    соединение
                                </p>
                                <p className="devices-processing">
                                    Идет проверка...
                                </p>
                            </div> :
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image devices-item__image-error"/>
                                    <div className="devices-check devices-check-error">
                                        <img src="../../images/device-error.svg" alt=""
                                             className="devices-check-image"/>
                                    </div>
                                </div>
                                <p className="devices-item__title">
                                    Сетевое
                                    соединение
                                </p>
                                <p className="devices-item__status devices-item__status-error">
                                    Ошибка проверки
                                </p>
                                <button className="devices-repeat btn">
                                    <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/>
                                    <span
                                        className="devices-repeat-text">Начать заново</span>
                                </button>
                            </div>}
                    {this.state.allowedVideoCamera == true ?
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
                        </div> :
                        this.state.allowedVideoCamera == "processing" ?
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image-processing"/>
                                </div>
                                <p className="devices-item__title">
                                    Подключение
                                    веб-камеры
                                </p>
                                <p className="devices-processing">
                                    Идет проверка...
                                </p>
                            </div> :
                            <div className="devices-item">
                                <div className="devices-relative">
                                    <img src="../../images/device-success.svg"
                                         className="devices-item__image devices-item__image-error"/>
                                    <div className="devices-check devices-check-error">
                                        <img src="../../images/device-error.svg" alt=""
                                             className="devices-check-image"/>
                                    </div>
                                </div>
                                <p className="devices-item__title">
                                    Подключение
                                    веб-камеры
                                </p>
                                <p className="devices-item__status devices-item__status-error">
                                    Ошибка проверки
                                </p>
                                <button className="devices-repeat btn">
                                    <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/>
                                    <span
                                        className="devices-repeat-text">Начать заново</span>
                                </button>
                            </div>}
                    {/*
                <button className="devices-repeat btn">
                                    <img src="../../images/button-again.svg" alt="" className="devices-repeat-img"/>
                                    <span
                                        className="devices-repeat-text">Начать заново</span>
                                </button>
                                */}
                </div>
                <div class="devices-button-next" onClick={() => Store.currentComponent = "Description"}>
                    <button class="devices-button btn-disabled btn" disabled={!this.state.allowedMicrophone || !this.state.allowedVideoCamera || !this.state.allowedInternetStatus}>
                        Далее
                    </button>
                </div>
            </div>
        );
    }
}

export default observer(Devices);