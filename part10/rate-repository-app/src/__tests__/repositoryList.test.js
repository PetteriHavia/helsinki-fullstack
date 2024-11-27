
import RepositoryList from "../components/RepositoryList";
import { GET_REPOSITORIES } from "../../graphql/queries";
import { render, screen, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: {
      data: {
        repositories: {
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
            },
          ],
        },
      },
    },
  },
];

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      render(
        <MockedProvider mocks={mocks} addTypeName={false}>
          <RepositoryList />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('jaredpalmer/formik')).toBeTruthy();
        expect(screen.getByText('Build forms in React, without the tears')).toBeTruthy();
        expect(screen.getByText('TypeScript')).toBeTruthy();
        expect(screen.getByText('1.6k')).toBeTruthy();
        expect(screen.getByText('21.9k')).toBeTruthy();
        expect(screen.getByText('88')).toBeTruthy();
        expect(screen.getAllByText('3').length).toBe(2)

        expect(screen.getByText('async-library/react-async')).toBeTruthy();
        expect(screen.getByText('Flexible promise-based React data loader')).toBeTruthy();
        expect(screen.getByText('JavaScript')).toBeTruthy();
        expect(screen.getByText('69')).toBeTruthy();
        expect(screen.getByText('1.8k')).toBeTruthy();
        expect(screen.getByText('72')).toBeTruthy();
      })
    });
  });
});