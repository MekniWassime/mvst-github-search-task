import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RepositoryLoadingPlaceholder from './RepositoryLoadingPlaceholder';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/RepositoryLoadingPlaceholder',
    component: RepositoryLoadingPlaceholder,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RepositoryLoadingPlaceholder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RepositoryLoadingPlaceholder> = (args) => <RepositoryLoadingPlaceholder {...args} />;

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
    itemCount: 5
};
