import React from 'react'
import { Modal } from "semantic-ui-react";


function ClientModal({ clientModalVisible, setClientModalVisible }) {

    return (
        <Modal basic open={clientModalVisible} onClose={() => setClientModalVisible(!clientModalVisible)}>

            Client Modal

        </Modal>
    )
}

export default ClientModal

