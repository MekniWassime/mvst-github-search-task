import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RepositoryItem from './RepositoryItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/RepositoryItem',
    component: RepositoryItem,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RepositoryItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RepositoryItem> = (args) => <RepositoryItem {...args} />;

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
    repository: {
        id: "azerty",
        isStarred: false,
        name: "MekniWassime/devops-project",
        stars: 10,
        url: "https://github.com/MekniWassime/devops-project",
        primaryLanguage: "TypeScript",
        pushedAt: new Date(1679414719718),
    }
};

export const Starred = Template.bind({});
Starred.args = {
    repository: {
        id: "azerty",
        isStarred: true,
        name: "MekniWassime/devops-project",
        stars: 10,
        url: "https://github.com/MekniWassime/devops-project",
        primaryLanguage: "TypeScript",
        pushedAt: new Date(1679414719718),
    }
};

export const NoDateAndPrimaryLanguage = Template.bind({});
NoDateAndPrimaryLanguage.args = {
    repository: {
        id: "azerty",
        isStarred: false,
        name: "MekniWassime/devops-project",
        stars: 10,
        url: "https://github.com/MekniWassime/devops-project",
        primaryLanguage: undefined,
        pushedAt: undefined
    }
};
