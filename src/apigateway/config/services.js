module.exports.services = [
    {
        route: "/users",
        target: "http://localhost:9001/",
        paths: [
            {
                path: "/",
                auth: ["GET"]
            }
        ],
        rewrite: "/"
    }, 
    {
        route: "/categories",
        target: "http://localhost:9005/",
        paths: [],
        rewrite: '/categories/',
    },
    {
        route: "/brands",
        target: "http://localhost:9005/",
        paths: [],
        rewrite: '/brands/'
    },
    {
        route: "/products",
        target: "http://localhost:9005",
        paths: [],
        rewrite: '/products/',
    }
]

module.exports.serviceIdentity = {
    "/users": 0,
    "/categories": 1,
    "/brands": 2,
    "/products":3
}