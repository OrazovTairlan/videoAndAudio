import React, {useEffect, useState} from 'react';
import secondsToHms from "../../helpers/TimerHelper";

const TimerDescription = props => {
    const {time} = props;
    const [hoursNotFormatted, minutesNotFormatted, secondsNotFormatted] = secondsToHms(time);
    let hoursFormat, minutesFormat, secondsFormat;
    if (hoursNotFormatted != false) {
        hoursFormat = hoursNotFormatted.split(" ")[0];
    } else if (hoursNotFormatted == false) {
        hoursFormat = 0;
    }
    if (minutesNotFormatted != false) {
        minutesFormat = minutesNotFormatted.split(" ")[0];
    } else if (minutesNotFormatted == false) {
        minutesFormat = 0;
    }
    if (secondsNotFormatted != false) {
        secondsFormat = secondsNotFormatted.split(" ")[0];
    } else if (secondsNotFormatted == false) {
        secondsFormat = 0;
    }
    const [hoursState, setHours] = useState(Number(hoursFormat));
    const [minutesState, setMinutes] = useState(Number(minutesFormat));
    const [secondsState, setSeconds] = useState(Number(secondsFormat));
    let [minutesFormatted, setMinutesFormatted] = useState(String(minutesState));
    let [hoursFormatted, setHoursFormatted] = useState(String(hoursState));
    console.log(hoursState, minutesState, secondsState)
    useEffect(() => {
        let myInterval = setInterval(() => {
            console.log(hoursState, minutesState, secondsState)
            if (hoursState <= 0 && secondsState <= 0 && minutesState <= 0) {
                clearInterval(myInterval)
                return;
            }
            if (secondsState > 0) {
                setSeconds(secondsState - 1);
            }
            if (secondsState == 0) {
                if (hoursState != 0 || hoursState == 0) {
                    if (minutesState == 0 && hoursState != 0) {
                        setHours(hoursState - 1);
                    } else {
                        setMinutes(minutesState - 1);
                        setSeconds(59);
                    }
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
    }, [minutesState, secondsState, hoursState]);
    return (
        <div>
            <button className="right-content-button-timer btn">
                {hoursFormatted}:{minutesFormatted}:{secondsState}
            </button>
        </div>
    );
};

export default TimerDescription;