import GenerateDataIndexNames from './GenerateDataIndexNames';
import GenerateJoinIndexData from './GenerateJoinIndexData';
import GenerateUniqueIndexData from './GenerateUniqueIndexData';
import colorout from './utils/colorout';
import handleError from './utils/handleError';

(async () => {
  try {

    console.log(`\n${colorout.fg.blue}[ RUN SCRIPT ]${colorout.reset} GenerateUniqueIndexData\n`);
    await GenerateUniqueIndexData();

    console.log(`\n${colorout.fg.blue}[ RUN SCRIPT ]${colorout.reset} GenerateJoinIndexData\n`);
    // GenerateJoinIndexData need run after GenerateUniqueIndexData
    await GenerateJoinIndexData();

    console.log(`\n${colorout.fg.blue}[ RUN SCRIPT ]${colorout.reset} GenerateDataIndexNames\n`);    
    await GenerateDataIndexNames();

  } catch(error) {
    handleError(error);
  }
})();