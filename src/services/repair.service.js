const { elasticClient } = require("common/elasticsearch");

const runAllRepair = async () => {
  console.group("Repair started at ", new Date());

  console.groupEnd();
};

// check index is exists and create if not exists
const checkIndex = async (index) => {
  const result = await elasticClient.indices.exists({ index });
  if (!result) {
    await elasticClient.indices.create({ index });
  }
};

module.exports = { runAllRepair };
