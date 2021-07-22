import React, {useEffect, useState} from 'react';

const Timer = props => {
    const {minutes, seconds, update} = props;
    const [minutesState, setMinutes] = useState(minutes);
    const [secondsState, setSeconds] = useState(seconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            console.log(minutesState, secondsState)
            if (secondsState > 0) {
                setSeconds(secondsState - 1);
            }
            if (secondsState == 0) {
                console.log("0")
                if (minutesState == 0) {
                    update({disabledButton: false});
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutesState - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            {minutesState === 0 && secondsState === 0
                ? null
                : <button className="right-content-button-timer btn">
                    {minutesState}:{secondsState}
                </button>
            }
        </div>
    );
}

export default Timer;