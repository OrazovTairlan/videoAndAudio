import React, {useEffect, useState} from 'react';
import secondsToHms from "../../helpers/TimerHelper";
const TimerDescription = props => {
    const {time} = props;
    console.log(time, "time")
    const [hoursNotFormatted, minutesNotFormatted, secondsNotFormatted] = secondsToHms(time);
    const hoursFormat = hoursNotFormatted.split(" ")[0];
    const minutesFormat = minutesNotFormatted.split(" ")[0];
    const secondsFormat = secondsNotFormatted.split(" ")[0];
    const [hoursState, setHours] = useState(Number(hoursFormat));
    const [minutesState, setMinutes] = useState(Number(minutesFormat));
    const [secondsState, setSeconds] = useState(Number(secondsFormat));
    let [minutesFormatted, setMinutesFormatted] = useState(String(minutesState));
    let [hoursFormatted, setHoursFormatted] = useState(String(hoursState));
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
            <button className="right-content-button-timer btn">
                {hoursFormatted}:{minutesFormatted}:{secondsState}
            </button>
        </div>
    );
};

export default TimerDescription;