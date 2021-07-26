import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
    return (
        <div className="devices-item">
            <CircularProgress variant="determinate" {...props} />
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
    );
}

const Device = props => {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressWithLabel value={progress}/>;
};

Device.propTypes = {};

export default Device;