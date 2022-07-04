import { createProject } from '../createProject';
import { when } from 'jest-when';

const mockQuery = jest.fn();

jest.mock('mysql2', () => ({
  createPool: () => ({
    promise: () => {
      return {
        query: (q: string, val: object) => mockQuery(q, val),
      };
    },
  }),
}));

test('it should generate a unique when creating a new project', async () => {
  when(mockQuery)
    .calledWith(
      'SELECT id FROM projects WHERE percy_token = ?',
      expect.anything(),
    )
    .mockReturnValue(undefined);

  await createProject('myProject', 1);
  await createProject('myProject', 1);

  expect(mockQuery).toHaveBeenCalledTimes(4);

  const [, , firstUniqueId] = mockQuery.mock.calls[0][1];
  const [, , secondUniqueId] = mockQuery.mock.calls[1][1];

  expect(firstUniqueId).not.toBe(secondUniqueId);
});

test('will generate a new id if the unique id is in fact a duplicate', async () => {
  when(mockQuery)
    .calledWith(
      'SELECT id FROM projects WHERE percy_token = ?',
      expect.anything(),
    )
    .mockReturnValue([{}]);

  await createProject('myProject', 1);

  const [, , firstUniqueId] = mockQuery.mock.calls[0][1];
  const [, , secondUniqueId] = mockQuery.mock.calls[1][1];
  const [, , thirdUniqueId] = mockQuery.mock.calls[2][1];
  const [, , fourthUniqueId] = mockQuery.mock.calls[3][1];

  expect(firstUniqueId).not.toBe(secondUniqueId);
  expect(thirdUniqueId).not.toBe(fourthUniqueId);
});

test('will create unique id of 60 characters', async () => {
  when(mockQuery)
    .calledWith(
      'SELECT id FROM projects WHERE percy_token = ?',
      expect.anything(),
    )
    .mockReturnValue(undefined);

  await createProject('myProject', 1);

  const [, , firstUniqueId] = mockQuery.mock.calls[1][1];

  expect(firstUniqueId).toHaveLength(60);
});
