import React from 'react';
import { BreadcrumbsContainer, Button } from '../components';
import { PATH_MEMBERSHIP } from '../routes/paths';
import { SvgClose } from '../assets/svg';

export default function MembershipPage() {
    return (
        <>
            <div className="px-4 py-3">
                <BreadcrumbsContainer
                    path={[
                        { url: PATH_MEMBERSHIP.ROOT, title: 'membership' },
                        { url: PATH_MEMBERSHIP.LIST, title: 'list' },
                    ]}
                >
                    <Button svg={<SvgClose />} title="test" />
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
