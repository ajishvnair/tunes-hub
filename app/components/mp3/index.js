import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalContainer = styled(Modal)`
    && {
        width: fit-content !important;
        .ant-modal-content {
            height: 400px;
        }
    }
`;

const Audio = styled.audio`
    && {
        margin-top: 300px;
    }
`;

export function Mp3Player({ visible, setVisible, currentElement }) {
    return (
        <ModalContainer visible={visible} onCancel={() => setVisible(false)} footer={null}>
            <Audio controls autoPlay="true" src={currentElement?.url}></Audio>
        </ModalContainer>
    );
}
Mp3Player.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    currentElement: PropTypes.currentElement
};

export default Mp3Player;
