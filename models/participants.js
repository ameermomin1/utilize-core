module.exports = (sequelize, DataTypes) => {
    const participant = sequelize.define(
        'participants',
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
            is_active: {
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: true,
            },
            created_at: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: sequelize.fn('now')
            },
        },
        {
            tableName: 'participants',
            schema: 'public',
            indexes: [
                {
                    name: 'participants_pkey',
                    unique: true,
                    fields: [
                        { name: 'id' },
                    ],
                },
            ],
        },
    );
    participant.associate = function (models) {
      participant.belongsTo(models.users, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    };
    return participant;
};
