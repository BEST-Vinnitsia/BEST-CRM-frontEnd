import React, { useState } from 'react';
import { BreadcrumbsContainer, Button, Popup, ScrollY, Text } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.LIST, title: pageNames.global.list },
];

export default function CommitteeListPage() {
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [openPopup, setOpenPopup] = useState(false);

    const test = () => {
        utilsActions.addMessage({
            status: count % 2 === 0 ? 'error' : 'success',
            message: `${count}`,
        });
        // utilsActions.addMessage({ status: 'info', message: `${2}` });
        // utilsActions.addMessage({ status: 'success', message: `${3}` });
        // utilsActions.addMessage({ status: 'warn', message: `${4}` });

        setCount((prev) => prev + 1);
    };

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_COMMITTEE.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_COMMITTEE.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_COMMITTEE.DETAILS}/id`)} title="Details" />
                    </div>
                </BreadcrumbsContainer>
            </div>

            <button onClick={test} className="p-3 bg-slate-500 rounded-lg m-4">
                Add message
            </button>

            <button onClick={() => setOpenPopup(true)} className="p-3 bg-slate-500 rounded-lg m-4">
                popup
            </button>

            <Popup isOpen={openPopup} onClose={() => setOpenPopup(false)} sx={{ maxH: 'calc(100dvh - 20px)' }}>
                <ScrollY sx={{ maxH: 'calc(100dvh - 20px)', p: '8px' }}>
                    <Text text="Demo" type={'h4'} width={'bold'} />
                    <Text
                        type={'span'}
                        width={'lite'}
                        color={'gray'}
                        text={`asdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        gdshjkasdhG Khgkh gakshdgkajhsdg kahjsgd kajhsgd kajhgsd jahsgd kjha 
                        `}
                    />
                </ScrollY>
            </Popup>
        </>
    );
}
