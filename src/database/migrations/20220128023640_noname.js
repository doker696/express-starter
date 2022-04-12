const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(fio) => "orders"
 * addColumn(adress) => "orders"
 *
 */

const info = {
  revision: 22,
  name: "noname",
  created: "2022-01-28T02:36:40.357Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "orders",
      "fio",
      { type: Sequelize.STRING(255), field: "fio", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "orders",
      "adress",
      { type: Sequelize.STRING(255), field: "adress", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["orders", "fio", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["orders", "adress", { transaction }],
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
