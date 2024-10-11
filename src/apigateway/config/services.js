module.exports.services = [
    {
        route: "/users",
        target: "http://localhost:9001/",
        paths: [
            {
                path: "/",
                auth: ["GET"]
            }
        ]
    }
]

module.exports.serviceIdentity = {
    "/users": 0,
    "/admin": 1
}