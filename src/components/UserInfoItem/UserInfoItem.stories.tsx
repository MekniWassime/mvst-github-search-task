import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserInfoItem from './UserInfoItem';

export default {
    title: 'Components/UserInfoItem',
    component: UserInfoItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UserInfoItem>;

const Template: ComponentStory<typeof UserInfoItem> = (args) => <UserInfoItem {...args} />;

//Standard look
export const Standard = Template.bind({});
Standard.args = {
    user: {
        name: "Mekni_Wassime",
        login: "mekniwassime",
        avatarUrl: "https://avatars.githubusercontent.com/u/60438665?u=31a53af71f017d9b1864044f7333fb70d0a0e384&v=4"
    }
};

//Name is optional on github so our interface needs to work with that
export const NoName = Template.bind({});
NoName.args = {
    user: {
        name: undefined,
        login: "mekniwassime",
        avatarUrl: "https://avatars.githubusercontent.com/u/60438665?u=31a53af71f017d9b1864044f7333fb70d0a0e384&v=4"
    }
};

export const Loading = Template.bind({});
Loading.args = {
    user: null
};