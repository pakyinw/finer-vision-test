import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')

// init database schema and adding constraints
const survey = sequelize.define('Survey', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: '1850-01-01',
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

// insert two dummy records
export const initDatabase = async () => {
  await sequelize.sync({ force: true })
  survey.create({
    firstname: 'John',
    surname: 'Doe',
    email: 'johndoe@johndoe.com',
    tel: '+44 7777 777777',
    gender: 'male',
    birthday: new Date().toISOString(),
    comment: "John's surname is Doe",
  })
  survey.create({
    firstname: 'Jane',
    surname: 'Doe',
    email: 'janedoe@janedoe.com',
    tel: '+44 5555 555555',
    gender: 'female',
    birthday: new Date().toISOString(),
    comment: "Jane's surname is Doe",
  })
}

export { survey, sequelize }

export const port = '2021'
