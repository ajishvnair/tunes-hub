import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { fonts, colors } from '@themes';
import { injectIntl } from 'react-intl';
import T from '@components/T';

const StyledHeader = styled(Layout.Header)`
    && {
        &.ant-layout-header {
            padding: 0 1rem;
            height: 11rem;
        }
        display: flex;
        justify-content: center;
        background: ${colors.primary};
        background: -webkit-linear-gradient(to right, ${colors.primary}, ${colors.secondary});
        background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
    }
`;

const Title = styled(T)`
    && {
        margin-bottom: 0;
        ${fonts.dynamicFontSize(fonts.size.extraLarge, 1, 0.5)};
        display: flex;
        align-self: center;
        color: white;
    }
`;

export function Header(props) {
    return (
        <StyledHeader {...props} data-testid="header">
            <Title type="heading" id="tunes_hub" />
        </StyledHeader>
    );
}

export default injectIntl(Header);
