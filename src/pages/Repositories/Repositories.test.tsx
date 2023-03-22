import { render, screen, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing'
import Repositories from './Repositories';
import { userEvent } from '@storybook/testing-library';
import { mockedApolloClientResponses } from './mocks';
import React from 'react';

jest.mock('react-redux')

describe('Repository Page Test', () => {
    test('Should have two items in total and only one that has the word "mvst"', async () => {
        //Arrange
        //The page reads the authenticated login from redux store
        (useSelector as jest.Mock).mockImplementation((state) => "MekniWassime")
        //Render our page with mocked graphql api responses and in memory router
        render(
            <MockedProvider mocks={mockedApolloClientResponses}>
                <MemoryRouter>
                    <Repositories />
                </MemoryRouter>
            </MockedProvider>
        )

        //Initially when the search input is empty, all of the user's repository should be fetched
        //here we should have two total repos check ./mocks.ts for mocked graphql api data 
        const allRepositories = await screen.findAllByTestId("repositoryItem")
        expect(allRepositories.length).toEqual(2)

        //Now we type 'mvst' in the search barch, after a little delay our input will automatically
        //trigger a search, exactly one repository matches the 'mvst' search string
        const input = screen.getByPlaceholderText("Search")
        await userEvent.click(input)
        await userEvent.keyboard("mvst")
        await waitFor(() => {
            expect(screen.getByTestId("repositoryItem")).toBeInTheDocument();
        });
        const oneRepository = await screen.findAllByTestId("repositoryItem")
        expect(oneRepository.length).toEqual(1)
    })

})