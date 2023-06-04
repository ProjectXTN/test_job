import { rest } from 'msw';

const handlers = [
  rest.get('/environment_questions', (req, res, ctx) => {
    const data = [
      {
        question: "Question 1",
        answers: [
          { answer: "Answer 1", isCorrect: true },
          { answer: "Answer 2", isCorrect: false },
        ],
      },
    ];

    return res(ctx.json(data));
  }),
];

export { handlers };
