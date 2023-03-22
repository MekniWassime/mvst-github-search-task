import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RepositoryItem from './RepositoryItem';

export default {
    title: 'Components/RepositoryItem',
    component: RepositoryItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RepositoryItem>;

const Template: ComponentStory<typeof RepositoryItem> = (args) => <RepositoryItem {...args} />;

export const Standard = Template.bind({});
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
