import { Todo } from "../types/todo";

export const fakeTodos = <Todo[]>[
  {
    id: '1',
    description: '1',
    isCompleted: false
  },
  {
    id: '2',
    description: '2',
    isCompleted: true
  },
  {
    id: '3',
    description: '3',
    isCompleted: false
  },
];

export const fakeCompletedTodos = <Todo[]>[
  {
    id: '2',
    description: '2',
    isCompleted: true
  }
];

export const fakeActiveTodos = <Todo[]>[
  {
    id: '1',
    description: '1',
    isCompleted: false
  },
  {
    id: '3',
    description: '3',
    isCompleted: false
  },
];
