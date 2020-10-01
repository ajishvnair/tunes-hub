import React from 'react';
import { Skeleton, Row, Col } from 'antd';
import styled from 'styled-components';

const SkeletonContainer = styled(Row)`
    && {
        margin-top: 10px;
        margin-left: 10px;
    }
`;

const SkeletonElement = styled(Skeleton.Button)`
    && {
        margin-top: 10px;
        height: 100px !important;
        border-radius: 5px !important;
        width: 200px !important;
    }
`;

export default function() {
    return (
        <SkeletonContainer justify="space-between">
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
            <Col span={5}>
                <SkeletonElement active="true" />
            </Col>
        </SkeletonContainer>
    );
}
