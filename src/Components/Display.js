import React from 'react';

const Display = (props) => {
    const {details} = props;
    return (
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3">
                <div className="small-box bg-yellow">
                    <div className="inner">
                        <h2>
                            {details.tempInCelcius}&#8451;
                          </h2>
                        <p>
                            {details.icon}
                          </p>
                          <p>
                            {details.country}
                          </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Display;