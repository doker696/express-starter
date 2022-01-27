const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "characteristics", deps: []
 * createTable() => "characteristicValues", deps: [characteristics]
 * createTable() => "productCharacteristics", deps: [characteristics, products]
 * createTable() => "CategoryCharacteristic", deps: [categories, characteristics]
 *
 */

const info = {
  revision: 7,
  name: "noname",
  created: "2022-01-09T18:34:51.008Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "characteristics",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING(30), field: "title", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "characteristicValues",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        value: { type: Sequelize.STRING(30), field: "value", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        characteristicId: {
          type: Sequelize.INTEGER,
          field: "characteristicId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "characteristics", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "productCharacteristics",
      {
        value: {
          type: Sequelize.STRING(255),
          field: "value",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        characteristicId: {
          type: Sequelize.INTEGER,
          field: "characteristicId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "characteristics", key: "id" },
          primaryKey: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CategoryCharacteristic",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          primaryKey: true,
        },
        characteristicId: {
          type: Sequelize.INTEGER,
          field: "characteristicId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "characteristics", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["characteristics", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["characteristicValues", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["productCharacteristics", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CategoryCharacteristic", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
