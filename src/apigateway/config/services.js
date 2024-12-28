module.exports.services = [
  {
    route: "/users",
    target: "http://localhost:9001/",
    paths: [
      {
        path: "/",
        auth: ["GET"],
      },
      {
        path: "/addresses/",
        auth: ["GET", "POST", "PUT", "DELETE"]
      },
      {
        path: /^\/addresses\/\d+$/,
        auth: ["PUT", "DELETE"]
      }
    ],
    rewrite: "/users/",
  },
  {
    route: "/categories",
    target: "http://localhost:9005/",
    paths: [],
    rewrite: "/categories/",
  },
  {
    route: "/brands",
    target: "http://localhost:9005/",
    paths: [],
    rewrite: "/brands/",
  },
  {
    route: "/products",
    target: "http://localhost:9005",
    paths: [
      {
        path: /^\/\d+\/reviews$/,
        auth: ["POST"],
      },
    ],
    rewrite: "/products/",
  },
  {
    route: "/carts",
    target: "http://localhost:9009",
    paths: [{
        path: '/',
        auth: ["GET", "POST"]
    }, {
        path: /^\/\d+/,
        auth: ["GET" , "POST", "PUT", "DELETE"]
    }],
    rewrite: "/carts/",
  },
  {
    route: "/orders",
    target: "http://localhost:9009",
    paths: [
      {
        path: "/",
        auth: ["GET", "POST"]
      }
    ],
    rewrite: "/orders/",
  },
  {
    route: "/shipping",
    target: "http://localhost:9009",
    paths: [],
    rewrite: "/shipping/",
  },
  {
    route: "/coupons",
    target: "http://localhost:9009",
    paths: [{
      path: '/',
      auth: ["GET", "POST"]
  }],
    rewrite: "/coupons/"
  }
];

module.exports.serviceIdentity = {
  "/users": 0,
  "/categories": 1,
  "/brands": 2,
  "/products": 3,
  "/carts": 4,
  "/orders": 5,
  "/shipping": 6,
  "/coupons": 7
};
