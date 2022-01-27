const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * dropTable() => "tweets", deps: []
 * createTable() => "ratings", deps: [products]
 * createTable() => "userProductRatings", deps: [products, users]
 * createTable() => "UserProductRating", deps: [users, products]
 *
 */

const info = {
  revision: 12,
  name: "noname",
  created: "2022-01-14T22:05:16.560Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["tweets", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "ratings",
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
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "products", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "userProductRatings",
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
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserProductRating",
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
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
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
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["ratings", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userProductRatings", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserProductRating", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "tweets",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "users", key: "id" },
          field: "userId",
          allowNull: false,
        },
        tweet: {
          type: Sequelize.STRING(140),
          field: "tweet",
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
      },
      { transaction },
    ],
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
