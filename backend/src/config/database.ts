import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('agendafacil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    timestamps: false,   // <- desliga timestamps GLOBALMENTE (opcional)
    freezeTableName: true,
    underscored: true,
  },
});


sequelize
  .sync()
  .then(() => {
    console.log('database foi sincronizado com sucesso');
  })
  .catch((error) => {
    console.log('deu zica no bagulho', error);
  });


export default sequelize;
