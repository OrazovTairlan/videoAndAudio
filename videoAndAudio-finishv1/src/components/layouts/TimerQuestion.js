import React, {useEffect, useState} from 'react';

const Timer = props => {
    const {minutes, seconds, update} = props;
    const [minutesState, setMinutes] = useState(minutes);
    const [secondsState, setSeconds] = useState(seconds);
    let [minutesFormatted, setMinutesFormatted] = useState("");
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (secondsState > 0) {
                setSeconds(secondsState - 1);
            }
            if (secondsState == 0) {
                if (minutesState == 0) {
                    update({disabledButton: false});
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutesState - 1);
                    setSeconds(59);
                }
            }
            if (String(minutesState).length == 1) {
                setMinutesFormatted("0" + minutesState);
            } else {
                setMinutesFormatted(minutesState);
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
                : <span className="question-statistics-count-subtext">
                    {minutesFormatted}:{secondsState}
                </span>
            }
        </div>
    );
}

export default Timer;