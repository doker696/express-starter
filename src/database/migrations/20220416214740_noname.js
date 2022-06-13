const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(count) => "products"
 * changeColumn(name) => "products"
 *
 */

const info = {
  revision: 25,
  name: "noname",
  created: "2022-04-16T21:47:40.009Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "products",
      "count",
      { type: Sequelize.INTEGER, field: "count" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "products",
      "name",
      { type: Sequelize.STRING(140), field: "name" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "products",
      "count",
      { type: Sequelize.INTEGER, field: "count", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "products",
      "name",
      { type: Sequelize.STRING(140), field: "name", allowNull: false },
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
