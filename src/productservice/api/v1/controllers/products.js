module.exports.defaultRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to Product service!"})
}

