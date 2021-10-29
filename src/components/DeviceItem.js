import React, {useContext, useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";

import {fetchBrands} from "../http/deviceAPI";


const DeviceItem = ({device_obj}) => {
    const [brand, setBrand] = useState('')
    useEffect(() => {

        fetchBrands().then(data => {
            setBrand(data.filter((brand)=>brand.id===device_obj.brandId)[0].name)
        })

    }, [])

    const history = useHistory()

    return (
        <Col md={3} className="mt-3" onClick={() => history.push(DEVICE_ROUTE+'/'+device_obj.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device_obj.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>
                        {brand}
                    </div>
                    <div className="d-flex align-items-center">
                        <div>{device_obj.rating}</div>
                        <div width={20} height={20}>*</div>
                    </div>

                </div>
                    <div>{device_obj.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;