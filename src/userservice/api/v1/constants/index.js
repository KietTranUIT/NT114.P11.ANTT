module.exports.ACCOUNT_STATUS = {
    Active: 'active',
    Inactive: 'inactive',
    Blocked: 'blocked'
}

module.exports.REQUIRED_PARAMETERS = {
    register: ['email', 'fullName', 'password', 'confirmPassword'],
}

module.exports.ROLES = {
    Admin: 1,
    Editor: 2,
    Sales: 3,
    Support: 4,
    Customer: 5,
}

module.exports.SEND_EMAIL_TYPES = {
    Welcome: 1
}