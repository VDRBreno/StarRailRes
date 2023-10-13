import path from 'path';
import fs from 'fs';
import handleError from './utils/handleError';
import colorout from './utils/colorout';

(async () => {
  try {
    const rootPath = path.join(__dirname, '..', '..');

    const newFolderNameFormatter = (name: string) => 'names_'+name;
    const authorizedFolders = [
      'characters',
      'light_cones'
    ];

    const folder = 'index_min';
    const folderPath = path.join(rootPath, folder);
    const newFolderName = newFolderNameFormatter(folder);
    const newFolderPath = path.join(rootPath, newFolderName);
    if(!fs.existsSync(newFolderPath)) {
      fs.mkdirSync(newFolderPath);
      console.log(`${colorout.fg.green}[ FOLDER ]${colorout.reset} ${newFolderName}`);
    }

    const i18nFolders = fs.readdirSync(folderPath);
    for(const i18nFolder of i18nFolders) {
      const i18nFolderPath = path.join(folderPath, i18nFolder);
      const jsonFiles = fs.readdirSync(i18nFolderPath);

      const newI18nPath = path.join(newFolderPath, i18nFolder);
      if(!fs.existsSync(newI18nPath)) {
        fs.mkdirSync(newI18nPath);
        console.log(`${colorout.fg.green}[ FOLDER ]${colorout.reset} ${newFolderName}/${i18nFolder}`);
      }

      let newData: {[key: string]: string} = {};

      for(const jsonFile of jsonFiles) {
        const jsonFilePath = path.join(i18nFolderPath, jsonFile);
        const data = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf-8' }));

        const jsonFolderName = jsonFile.split('.')[0];
        if(!authorizedFolders.includes(jsonFolderName)) continue;
      
        for(const key in data) {
          newData[key]=data[key].name;
        }
      }

      const dataFormatted = JSON.stringify(newData);
      const filename = 'names.json';
      const filePath = path.join(newI18nPath, filename);
      fs.writeFileSync(filePath, dataFormatted);
      console.log(`${colorout.fg.green}[ FILE ]${colorout.reset} ${newFolderName}/${i18nFolder}/${filename}`);
    }
  } catch(error) {
    handleError(error);
  }
})();