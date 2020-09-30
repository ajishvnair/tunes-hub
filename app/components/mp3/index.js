import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

export function Mp3Player({ visible, setVisible, currentElement }) {
    return (
        <Modal visible={visible} onCancel={() => setVisible(false)}>
            from modal
        </Modal>
    );
}
Mp3Player.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    currentElement: PropTypes.currentElement
};

export default Mp3Player;
