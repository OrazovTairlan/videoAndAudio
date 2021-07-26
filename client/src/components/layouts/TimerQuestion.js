import React, {useEffect, useState} from 'react';

const Timer = props => {
    const {minutes, seconds} = props;
    console.log(props)
    const [minutesState, setMinutes] = useState(Number(null));
    const [secondsState, setSeconds] = useState(Number(null));
    console.log(minutesState, secondsState);
    let [minutesFormatted, setMinutesFormatted] = useState("");
    useEffect(() => {
        if (minutes != undefined) {
            let myInterval = setInterval(() => {
                if (secondsState > 0) {
                    setSeconds(secondsState - 1);
                }
                if (secondsState == 0) {
                    if (minutesState == 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutesState - 1);
                        setSeconds(59);
                    }
                }
                // if (String(minutesState).length == 1) {
                //     setMinutesFormatted("0" + minutesState);
                // } else {
                //     setMinutesFormatted(String(minutesState));
                // }
            }, 1000);
            return () => {
                clearInterval(myInterval);
            };
        }
    });
    return (
        <div>
            {minutesState === 0 && secondsState === 0
                ? null
                : <span className="question-statistics-count-subtext">
                    {minutesState}:{secondsState}
                </span>
            }
        </div>
    );
}

export default Timer;