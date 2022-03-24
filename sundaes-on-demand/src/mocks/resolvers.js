export const SCOOPS_RESOLVER_WITH_DATA = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ])
  )
}

export const SCOOPS_RESOLVER_WITH_SERVER_ERROR = (req, res, ctx) => {
  return res(ctx.status(500))
}

export const TOPPINGS_RESOLVER_WITH_DATA = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
    ])
  )
}

export const TOPPINGS_RESOLVER_WITH_SERVER_ERROR = (req, res, ctx) => {
  return res(ctx.status(500))
}

export const ORDER_RESOLVER_WITH_SUCCESS = (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      orderNumber: 8759015682,
    })
  )
}
