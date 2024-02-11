import React, { useEffect } from 'react';
import { BreadcrumbsContainer, Button, Input, ScrollY } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { memberService } from '../../services';
import { useForm, useInput } from '../../hooks';
import { uuid } from '../../utils';

const pathMapEdit = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.CREATE, title: pageNames.global.create },
];

export default function MemberEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = useForm([
        useInput({ name: 'name' }),
        useInput({ name: 'surname' }),
        useInput({ name: 'middleName' }),
        useInput({ name: 'bestEmail' }),
        useInput({ name: 'email' }),
        useInput({ name: 'phone' }),
        useInput({ name: 'socialNetwork' }),
        useInput({ name: 'membership' }),
        useInput({ name: 'group' }),
        useInput({ name: 'faculty' }),
        useInput({ name: 'clothingSize' }),
        useInput({ name: 'homeAddress' }),
        useInput({ name: 'birthday' }),
    ]);

    useEffect(() => {
        if (id) {
            getMember();
        }
    }, []);

    const getMember = async () => {
        if (!id) return;

        const res = await memberService.getById({ id });
        if (!res) return;

        form.name.setValue(res.name);
        form.surname.setValue(res.surname);
        form.middleName.setValue(res.middleName);
        form.bestEmail.setValue(res.bestEmail ? res.bestEmail : '');
        form.email.setValue(res.email);
        form.phone.setValue(res.phone);
        form.socialNetwork.setValue(res.socialNetwork);
        form.membership.setValue(res.membership);
        form.group.setValue(res.group);
        form.faculty.setValue(res.faculty);
        form.clothingSize.setValue(res.clothingSize ? res.clothingSize : '');
        form.homeAddress.setValue(res.homeAddress ? res.homeAddress : '');
        form.birthday.setValue(res.birthday);
    };

    const submitMember = async () => {
        if (id) {
            const res = await memberService.update({
                id,
                birthday: form.birthday.value,
                name: form.name.value,
                surname: form.surname.value,
                middleName: form.middleName.value,
                bestEmail: form.bestEmail.value ? form.bestEmail.value : null,
                email: form.email.value,
                phone: form.phone.value,
                socialNetwork: form.socialNetwork.value,
                membership: form.membership.value,
                group: form.group.value,
                faculty: form.faculty.value,
                clothingSize: form.clothingSize.value.toUpperCase(),
                homeAddress: form.homeAddress.value,
            });
        } else {
            const currentDate = new Date('2000-01-01');

            const res = await memberService.create({
                login: `${uuid.generate()}@gmail.com`,
                password: 'P@ssword1234',
                name: form.name.value,
                birthday: currentDate.toISOString(),
                surname: form.surname.value,
                middleName: form.middleName.value,
                bestEmail: form.bestEmail.value ? form.bestEmail.value : null,
                email: form.email.value,
                phone: form.phone.value,
                socialNetwork: form.socialNetwork.value,
                membership: form.membership.value,
                group: form.group.value,
                faculty: form.faculty.value,
                clothingSize: form.clothingSize.value.toUpperCase(),
                homeAddress: form.homeAddress.value,
            });
        }
    };

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={id ? pathMapEdit : pathMapCreate}>
                        <div className="flex">
                            {id && <Button onClick={() => navigate(`${PATH_MEMBER.DETAILS}/${id}`)} title="Details" />}
                            <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <div className="w-96">
                    <Input placeholder={'Name'} hookProps={form.name} />
                    <Input placeholder={'Surname'} hookProps={form.surname} />
                    <Input placeholder={'Middle name'} hookProps={form.middleName} />
                    <Input placeholder={'BEST email'} hookProps={form.bestEmail} />
                    <Input placeholder={'Email'} hookProps={form.email} />
                    <Input placeholder={'Phone'} hookProps={form.phone} />
                    <Input placeholder={'Social network'} hookProps={form.socialNetwork} />
                    <Input placeholder={'Membership'} hookProps={form.membership} />
                    <Input placeholder={'Group'} hookProps={form.group} />
                    <Input placeholder={'Faculty'} hookProps={form.faculty} />
                    <Input placeholder={'Clothing size'} hookProps={form.clothingSize} />
                    <Input placeholder={'Home address'} hookProps={form.homeAddress} />
                    <Input placeholder={'Day of birth'} hookProps={form.birthday} />
                </div>

                <Button title={'Submit'} onClick={submitMember} />
            </ScrollY>
        </>
    );
}
