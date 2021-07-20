import React, {Component} from 'react';
import "./App.css";
import Header from "./components/layouts/Header";
import ButtonBack from "./components/layouts/ButtonBack";


class App extends Component {
    state = {
        // screenX: "",
        // screenY: "",
        // mouseIsMoving: null
    }

    // (function() {
    //     // The width and height of the captured photo. We will set the
    //     // width to the value defined here, but the height will be
    //     // calculated based on the aspect ratio of the input stream.
    //
    //     var width = 320;    // We will scale the photo width to this
    //     var height = 0;     // This will be computed based on the input stream
    //
    //     // |streaming| indicates whether or not we're currently streaming
    //     // video from the camera. Obviously, we start at false.
    //
    //     var streaming = false;
    //
    //     // The various HTML elements we need to configure or control. These
    //     // will be set by the startup() function.
    //
    //     var video = null;
    //     var canvas = null;
    //     var photo = null;
    //     var startbutton = null;
    //
    //     function startup() {
    //         video = document.getElementById('video');
    //         canvas = document.getElementById('canvas');
    //         photo = document.getElementById('photo');
    //         startbutton = document.getElementById('startbutton');
    //
    //         navigator.mediaDevices.getUserMedia({video: true, audio: false})
    //             .then(function(stream) {
    //                 video.srcObject = stream;
    //                 video.play();
    //             })
    //             .catch(function(err) {
    //                 console.log("An error occurred: " + err);
    //             });
    //
    //         video.addEventListener('canplay', function(ev){
    //             if (!streaming) {
    //                 height = video.videoHeight / (video.videoWidth/width);
    //
    //                 // Firefox currently has a bug where the height can't be read from
    //                 // the video, so we will make assumptions if this happens.
    //
    //                 if (isNaN(height)) {
    //                     height = width / (4/3);
    //                 }
    //
    //                 video.setAttribute('width', width);
    //                 video.setAttribute('height', height);
    //                 canvas.setAttribute('width', width);
    //                 canvas.setAttribute('height', height);
    //                 streaming = true;
    //             }
    //         }, false);
    //
    //         startbutton.addEventListener('click', function(ev){
    //             takepicture();
    //             ev.preventDefault();
    //         }, false);
    //
    //         clearphoto();
    //     }
    //
    //     // Fill the photo with an indication that none has been
    //     // captured.
    //
    //     function clearphoto() {
    //         var context = canvas.getContext('2d');
    //         context.fillStyle = "#AAA";
    //         context.fillRect(0, 0, canvas.width, canvas.height);
    //
    //         var data = canvas.toDataURL('image/png');
    //         photo.setAttribute('src', data);
    //     }
    //
    //     // Capture a photo by fetching the current contents of the video
    //     // and drawing it into a canvas, then converting that to a PNG
    //     // format data URL. By drawing it on an offscreen canvas and then
    //     // drawing that to the screen, we can change its size and/or apply
    //     // other changes before drawing it.
    //
    //     function takepicture() {
    //         var context = canvas.getContext('2d');
    //         if (width && height) {
    //             canvas.width = width;
    //             canvas.height = height;
    //             context.drawImage(video, 0, 0, width, height);
    //
    //             var data = canvas.toDataURL('image/png');
    //             photo.setAttribute('src', data);
    //         } else {
    //             clearphoto();
    //         }
    //     }
    //
    //     // Set up our event listener to run the startup process
    //     // once loading is complete.
    //     window.addEventListener('load', startup, false);
    // })();

    handleStartAudio = () => {
        let {recorder} = this.state;
        recorder.start();
    }

    handleStopAudio = async () => {
        let {recorder} = this.state;
        let audio = await recorder.stop();
        audio.play();
    }

    hasGetUserMedia = () => {
        // Note: Opera builds are unprefixed.
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };
    sleep = time => new Promise(resolve => setTimeout(resolve, time));
    recordAudio = (data) => {
        return new Promise(resolve => {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    let audioChunks = [];

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });
                    const start = () => {
                        console.log("start");
                        mediaRecorder.start();
                    };

                    const stop = () => {
                        return new Promise(resolve => {
                            mediaRecorder.addEventListener("stop", () => {
                                const audioBlob = new Blob(audioChunks);
                                console.log("stop");
                                data.push(audioBlob);
                                console.log(data);
                                audioChunks = [];
                                const audioUrl = URL.createObjectURL(audioBlob);
                                const audio = new Audio(audioUrl);
                                const play = () => {
                                    audio.play();
                                };
                                play();

                                resolve({audioBlob, audioUrl, play});
                            });
                        });
                    };

                    resolve({start, stop});
                });
        });
    };

    getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    async componentDidMount() {
//         const images = [];
//         const data = [];
//         console.log(document.querySelector(".something"));
//         if (this.hasGetUserMedia()) {
//             const stream = await navigator.mediaDevices.getUserMedia({audio: true, video:true});
//             function record_and_send(stream) {
//                 const recorder = new MediaRecorder(stream);
//                 const chunks = [];
//                 recorder.ondataavailable = e => chunks.push(e.data);
//                 recorder.onstop = e => data.push(new Blob(chunks));
//                 setTimeout(()=> recorder.stop(), 5000); // we'll have a 5s media file
//                 recorder.start();
//             }
//             function playVideo(stream){
//                 const video = document.querySelector("video");
//                 video.srcObject = stream;
//                 video.play();
//             }
//
//             function takePicture() {
//                 const video = document.querySelector("video");
//                 const canvas = document.querySelector("canvas");
//                 canvas.width = video.width;
//                 canvas.height = video.height;
//                 canvas.getContext("2d").drawImage(video, 0, 0);
//                 images.push(canvas.toDataURL("image/webp"));
//             }
//
//             playVideo(stream);
// // generate a new file every 5s
//             setInterval(()=>record_and_send(stream), 5000);
//         }
//         await this.sleep( 6000);
//         setInterval(() => console.log(data), 5000);
        // const data = [];
        // // document.addEventListener("mousemove", (e) => {
        // //     this.setState({screenX: e.screenX, screenY: e.screenY, mouseIsMoving: true});
        // //     setTimeout(() => this.setState({mouseIsMoving: false}), 5000);
        // // });
        // // document.addEventListener("visibilitychange", function () {
        // //     if (document.hidden) {
        // //         console.log('Вкладка не активна');
        // //     } else {
        // //         console.log('Вкладка активна');
        // //     }
        // // });
        // // window.addEventListener("resize", function () {
        // //     console.log("resized");
        // // });
        // let mya = true; //по умолчанию вкладка активна
        // let a = 0;
        // setInterval(function () {
        //     if (!mya) return; //если не активная вкладка, ничего не делаем
        //     a++; //счетчик секунд
        //     console.log(a);
        //     // document.querySelector('.onlineuser').innerHTML = a;
        // }, 1000)
        // window.onfocus = function () {
        //     console.log('Вкладка активна');
        // }
        //
        // window.onblur = function () {
        //     mya = false;
        //     console.log('Вкладка не активна');
        // }
        //
        //
        // if (this.hasGetUserMedia()) {
        //     const recorder = await this.recordAudio(data);
        //     this.setState({recorder: recorder});
        //     // recorder.start();
        //     // await this.sleep(5000);
        //     // const audio = await recorder.stop();
        //     // audio.play();
        //     // console.log(data);
        // } else {
        //     alert('getUserMedia() is not supported in your browser');
        // }
    }

    render() {
        return (
            <div>
                <Header/>
                <ButtonBack name = "Назад"/>
            </div>
        );
    }
}

export default App;
// feather.replace();
//
// const controls = document.querySelector('.controls');
// const cameraOptions = document.querySelector('.video-options>select');
// const video = document.querySelector('video');
// const canvas = document.querySelector('canvas');
// const screenshotImage = document.querySelector('img');
// const buttons = [...controls.querySelectorAll('button')];
// let streamStarted = false;
//
// const [play, pause, screenshot] = buttons;
//
// const constraints = {
//     video: {
//         width: {
//             min: 1280,
//             ideal: 1920,
//             max: 2560,
//         },
//         height: {
//             min: 720,
//             ideal: 1080,
//             max: 1440
//         },
//     }
// };
//
// cameraOptions.onchange = () => {
//     const updatedConstraints = {
//         ...constraints,
//         deviceId: {
//             exact: cameraOptions.value
//         }
//     };
//
//     startStream(updatedConstraints);
// };
//
// play.onclick = () => {
//     if (streamStarted) {
//         video.play();
//         play.classList.add('d-none');
//         pause.classList.remove('d-none');
//         return;
//     }
//     if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
//         const updatedConstraints = {
//             ...constraints,
//             deviceId: {
//                 exact: cameraOptions.value
//             }
//         };
//         startStream(updatedConstraints);
//     }
// };
//
// const pauseStream = () => {
//     video.pause();
//     play.classList.remove('d-none');
//     pause.classList.add('d-none');
// };
//
// const doScreenshot = () => {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 0, 0);
//     screenshotImage.src = canvas.toDataURL('image/webp');
//     screenshotImage.classList.remove('d-none');
// };
//
// pause.onclick = pauseStream;
// screenshot.onclick = doScreenshot;
//
// const startStream = async (constraints) => {
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     handleStream(stream);
// };
//
//
// const handleStream = (stream) => {
//     video.srcObject = stream;
//     play.classList.add('d-none');
//     pause.classList.remove('d-none');
//     screenshot.classList.remove('d-none');
//
// };
//
//
// const getCameraSelection = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(device => device.kind === 'videoinput');
//     const options = videoDevices.map(videoDevice => {
//         return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
//     });
//     cameraOptions.innerHTML = options.join('');
// };
//
// getCameraSelection();