import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import TextInput from './TextInput';
import { FormProvider, useForm } from 'react-hook-form';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/TextInput',
    component: TextInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        submit: { action: "submit" }
    },
    decorators: [
        (Story) => {
            const [submitCounter, setSubmitCounter] = useState(0)
            const methods = useForm();
            return <FormProvider {...methods}>
                <Story args={{ label: "Search input", name: "search", submit: () => { setSubmitCounter(submitCounter + 1) } }} />
                <p>Input automatically submitted <span data-testid="counter">{submitCounter}</span> time(s)</p>
            </FormProvider>
        }
    ]
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});

export const AutomaticSubmitInteraction = Template.bind({});

AutomaticSubmitInteraction.play = async ({ canvasElement }) => {
    //  Arrange
    const canvas = within(canvasElement);
    //  Act
    const input = await canvas.getByPlaceholderText("Search input")
    await userEvent.click(input)
    await userEvent.keyboard("will submit one time automatically", { delay: 100 })
    //The input uses a delay to detect when the user has stopped typing
    //so we need to wait for that small delay before checking if the input submitted
    await new Promise(resolve => setTimeout(resolve, 400));
    //this counter is not part of the component but rather a decorator defined in this story's configuration
    const counter = await canvas.getByTestId("counter");
    //  Assert
    //The input should have automatically submitted exactly one time
    expect(counter.innerText).toContain("1")

}
