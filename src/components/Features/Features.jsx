import React from 'react';
import './features.css';
import RellaxWrapper from 'react-rellax-wrapper';

const rocket_img = {
    'Falcon 1' : 'falcon-1',
    'Falcon 9' : 'falcon-9',
    'Falcon Heavy' : 'falcon-heavy',
    'Starship' : 'starship',
}

const Features = props => {
    const img_url = `../../img/${rocket_img[props.rocket]}.png`;

    const features = {
        height: {
            meters: props.rocketFeatures ? props.rocketFeatures.height.meters : null,
            feet: props.rocketFeatures ? props.rocketFeatures.height.feet : null,
        },
        diameter: {
            meters: props.rocketFeatures ? props.rocketFeatures.diameter.meters : null,
            feet: props.rocketFeatures ? props.rocketFeatures.diameter.feet : null,
        },
        mass: {
            kg: props.rocketFeatures ? props.rocketFeatures.mass.kg : null,
            lb: props.rocketFeatures ? props.rocketFeatures.mass.lb : null,
        },
        payload_to_leo: {
            kg: props.rocketFeatures ? props.rocketFeatures.payload_weights.find(item => item.id === 'leo').kg : null,
            lb: props.rocketFeatures ? props.rocketFeatures.payload_weights.find(item => item.id === 'leo').lb : null
        },
        description: props.rocketFeatures ? props.rocketFeatures.description : "",
    };

    return (
        <React.Fragment>
            <section className="features">
                <h2 className="features-title">
                    {props.rocket} <br />Overview
                </h2>
                <div className="overview">

                    <table className="table">
                        <caption className="table-title">
                            Size
                        </caption>
                        <thead>
                            <tr>
                                <td className="table-column">HEIGHT</td>
                                <td className="table-column">{features.height.meters} m / {features.height.feet} ft</td>
                            </tr>
                            <tr>
                                <td className="table-column">DIAMETER</td>
                                <td className="table-column">{features.diameter.meters} m / {features.diameter.meters} ft</td>
                            </tr>
                            <tr>
                                <td className="table-column">MASS</td>
                                <td className="table-column">{features.mass.kg} kg / {features.mass.lb} lb</td>
                            </tr>
                            <tr>
                                <td className="table-column">PAYLOAD TO LEO</td>
                                <td className="table-column">{features.payload_to_leo.kg} kg / {features.payload_to_leo.lb} lb</td>
                            </tr>
                        </thead>
                    </table>
                    <RellaxWrapper speed={14}>
                        <img
                            src={img_url}
                            alt="rocket"
                            className="rocket"
                            id="rocket"
                        />
                    </RellaxWrapper>
                    <article>
                        <h3 className="features-subtitle">DESCRIPTION</h3>
                        <p className="features-text">
                            {features.description}
                        </p>
                    </article>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Features;




