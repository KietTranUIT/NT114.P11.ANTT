module.exports.defaultRoute = async (req, res) => {
    res.status(200).json({
        links: {
            self: "http://localhost:9001/users"
        },
        data: [{
            type: "users",
            id: 1,
            attributes: {
                fullname: "Tran Quang Kiet",
                email: "kiettranuit@gmail.com",
                gender: "Male",
                role: "Admin"
            }
        }]
    })
}