export const JsonPlaceholderEntities = [
  'posts',
  'comments',
  'albums',
  'photos',
  'todos',
  'users',
] as const;

export type JsonPlaceholderEntity = (typeof JsonPlaceholderEntities)[number];
