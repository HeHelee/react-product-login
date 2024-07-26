import { rest } from 'msw';

const API_URL = 'http://localhost:3000/api';

export const wishesMockHandler = [
  rest.get(`${API_URL}/wishes`, (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
      ? parseInt(req.url.searchParams.get('page')!, 10)
      : 0;
    const size = req.url.searchParams.get('size')
      ? parseInt(req.url.searchParams.get('size')!, 10)
      : 10;

    const wishes = [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Product A',
          price: 100,
          imageUrl: 'http://example.com/product-a.jpg',
        },
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'Product B',
          price: 150,
          imageUrl: 'http://example.com/product-b.jpg',
        },
      },
    ];

    const paginatedWishes = wishes.slice(page * size, (page + 1) * size);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedWishes,
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: page,
          pageSize: size,
          offset: page * size,
          unpaged: false,
          paged: true,
        },
        totalPages: Math.ceil(wishes.length / size),
        totalElements: wishes.length,
        last: page >= Math.ceil(wishes.length / size) - 1,
        number: page,
        size: size,
        numberOfElements: paginatedWishes.length,
        first: page === 0,
        empty: paginatedWishes.length === 0,
      }),
    );
  }),
  rest.post(`${API_URL}/wishes`, (req, res, ctx) => {
    const { productId } = req.body as { productId: number };
    return res(
      ctx.status(201),
      ctx.json({
        id: Math.random(),
        productId,
      }),
    );
  }),
  rest.delete(`${API_URL}/wishes/:wishId`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];