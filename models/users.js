module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            firstname: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: 'users_email_key'
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'users',
            schema: 'public',
            indexes: [
                {
                name: 'users_email_key',
                unique: true,
                fields: [
                    { name: 'email' },
                ],
                },
                {
                name: 'users_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
                },
            ],
        },
    );
    return user;
};
