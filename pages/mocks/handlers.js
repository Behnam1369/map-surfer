import { rest } from 'msw';

export const handlers = [
  rest.get('/search/get-address', (req, res, ctx) => {
    let city = areas[Math.floor(Math.random()*areas.length)].city;
    let streets = areas.find(a => a.city === city).streets;
    let street = streets[Math.floor(Math.random()*streets.length)];
    return res(
      ctx.status(200),
      ctx.json([city, street]),
    )
  }),
];

const areas = [
  {city: 'Tehran', streets: ['Azadi', 'Tajrish', 'Shahid Beheshti', 'Enghelab', 'Kargar', 'Navvab', 'Chamran', 'Sattarkhan', 'Kashani', 'Abouzar']},
  {city: 'Esfahan', streets: ['St1', 'St2', 'St3', 'St4', 'St5', 'St6', 'St7', 'St8', 'St9', 'St10']},
  {city: 'Shiraz', streets: ['Av1', 'Av2', 'Av3', 'Av4', 'Av5', 'Av6', 'Av7', 'Av8', 'Av9', 'Av10']},
]