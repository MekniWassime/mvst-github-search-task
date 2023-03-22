import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RepositoryLoadingPlaceholder from './RepositoryLoadingPlaceholder';

export default {
    title: 'Components/RepositoryLoadingPlaceholder',
    component: RepositoryLoadingPlaceholder,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RepositoryLoadingPlaceholder>;

const Template: ComponentStory<typeof RepositoryLoadingPlaceholder> = (args) => <RepositoryLoadingPlaceholder {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    itemCount: 5
};
