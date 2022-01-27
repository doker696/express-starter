const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(title) => "ratings"
 * dropTable() => "UserProductRating", deps: []
 * addColumn(value) => "ratings"
 *
 */

const info = {
  revision: 13,
  name: "noname",
  created: "2022-01-26T23:37:00.397Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["ratings", "title", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserProductRating", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "ratings",
      "value",
      { type: Sequelize.INTEGER, field: "value", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["ratings", "value", { transaction }],
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
  {
    fn: "addColumn",
    params: [
      "ratings",
      "title",
      { type: Sequelize.STRING(30), field: "title", allowNull: false },
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
