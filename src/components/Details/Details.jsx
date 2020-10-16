import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './details.css';
import FetchData from '../../service/FetchData'

const Details = props => {

    let { id } = useParams();

    const fetchData = new FetchData();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData.getLaunch(id)
            .then((data) => setData(data))
    }, []);

    if (data.length!=0){
    return (
        <React.Fragment>
            <main className="details">
                <div className="container">
                    <div className="details-row">
                        <div className="details-image">
                            <img src={data.links.patch.small} alt="" />
                        </div>
                        <div className="details-content">
                            <p className="details-description">{data.details}</p>
                        </div>
                    </div>
                    <div>
                        <iframe className="details-youtube" width="560" height="315" src={`http://www.youtube.com/embed/${data.links.youtube_id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <a onClick={props.history && props.history.goBack} className="button button-back">go back</a>
            </main>
        </React.Fragment>
    );
    } else {
        return (<></>)
    }
}

export default Details;
