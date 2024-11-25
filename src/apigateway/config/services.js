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
    }
]

module.exports.serviceIdentity = {
    "/users": 0,
    "/categories": 1
}