import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import DeviceItem from "./DeviceItem";

const DeviceList = () => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                <DeviceItem key={device.id} device_obj={device}/>
            )}
        </Row>
    );
};

export default observer(DeviceList);