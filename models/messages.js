module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define(
        'messages',
        {
            id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            user_id: {
              type:DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'users',
                key: 'id',
              }
            },
            group_id: {
              type:DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'groups',
                key: 'id',
              }
            },
            message: {
              type: DataTypes.TEXT,
              allowNull: false
            },
            created_at: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: sequelize.fn('now')
            },
        },
        {
            tableName: 'messages',
            schema: 'public',
            indexes: [
                {
                    name: 'messages_pkey',
                    unique: true,
                    fields: [
                        { name: 'id' },
                    ],
                },
            ],
        },
    );
    message.associate = function (models) {
      message.belongsTo(models.groups, {
        foreignKey: 'group_id',
        sourceKey: 'id',
      });
      message.belongsTo(models.users, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    };
    return message;
};
