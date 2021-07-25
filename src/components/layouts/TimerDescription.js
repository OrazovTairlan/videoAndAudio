import React, {useEffect, useState} from 'react';

const TimerDescription = props => {
    const {minutes, seconds, hours} = props;
    const [hoursState, setHours] = useState(hours);
    const [minutesState, setMinutes] = useState(minutes);
    const [secondsState, setSeconds] = useState(seconds);
    let [minutesFormatted, setMinutesFormatted] = useState(minutesState);
    let [hoursFormatted, setHoursFormatted] = useState(hoursState);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (secondsState > 0) {
                setSeconds(secondsState - 1);
            }
            if (secondsState == 0) {
                if (hoursState != 0) {
                    if (minutesState == 0) {
                        setHours(hoursState - 1);
                    } else {
                        setMinutes(minutesState - 1);
                        setSeconds(59);
                    }
                } else {
                    clearInterval(myInterval);
                }
            }
            if (String(hoursState).length == 1) {
                setHoursFormatted("0" + hoursState);
            }
            if (String(minutesState).length == 1) {
                setMinutesFormatted("0" + minutesState);
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
                    {hoursFormatted}:{minutesFormatted}:{secondsState}
                </button>
            }
        </div>
    );
};

export default TimerDescription;