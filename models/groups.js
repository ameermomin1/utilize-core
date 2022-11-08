module.exports = (sequelize, DataTypes) => {
    const group = sequelize.define(
        'groups',
        {
            id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            name: {
              type: DataTypes.STRING(60),
              allowNull: false
            },
            created_by: {
              type:DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'users',
                key: 'id',
              }
            },
            created_at: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: sequelize.fn('now')
            },
            created_by: {
              type:DataTypes.INTEGER,
              allowNull: true,
              references: {
                model: 'users',
                key: 'id',
              }
            },
            updated_at: {
              type: DataTypes.DATE,
              allowNull: true,
            }
        },
        {
            tableName: 'groups',
            schema: 'public',
            indexes: [
                {
                    name: 'groups_pkey',
                    unique: true,
                    fields: [
                        { name: 'id' },
                    ],
                },
            ],
        },
    );
    group.associate = function (models) {
      group.hasMany(models.participants, {
        foreignKey: 'group_id',
        sourceKey: 'id',
      });
      group.belongsTo(models.users, {
        foreignKey: 'created_by',
        sourceKey: 'id',
      });
    };
    return group;
};
