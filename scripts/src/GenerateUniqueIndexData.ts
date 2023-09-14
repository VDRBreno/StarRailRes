import fs from 'node:fs';
import path from 'node:path';
import colorout from './utils/colorout';

(async () => {
  const rootPath = path.join(__dirname, '..', '..');

  const folders = ['index_min'];
  const newFolderNameFormatter = (name: string) => 'unique_'+name;
  for(const folder of folders) {
    const folderPath = path.join(rootPath, folder);
    const newFolderName = newFolderNameFormatter(folder);
    const formattedFolderPath = path.join(rootPath, newFolderName);
    if(!fs.existsSync(formattedFolderPath)) {
      fs.mkdirSync(formattedFolderPath);
      console.log(`[${colorout.fg.green}${newFolderName}${colorout.reset}]`);
    }

    const i18nFolders = fs.readdirSync(folderPath);
    for(const i18nFolder of i18nFolders) {
      const i18nFolderPath = path.join(folderPath, i18nFolder);
      const jsonFiles = fs.readdirSync(i18nFolderPath);
        
      const formattedI18nPath = path.join(formattedFolderPath, i18nFolder);
      if(!fs.existsSync(formattedI18nPath)) {
        fs.mkdirSync(formattedI18nPath);
        console.log(`[${colorout.fg.green}${newFolderName}/${i18nFolder}${colorout.reset}]`);
      }

      for(const jsonFile of jsonFiles) {
        const jsonFilePath = path.join(i18nFolderPath, jsonFile);
        const data = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf-8' }));

        const jsonFolderName = jsonFile.split('.')[0];
        const formattedJsonFolderPath = path.join(formattedI18nPath, jsonFolderName);
        if(!fs.existsSync(formattedJsonFolderPath)) {
          fs.mkdirSync(formattedJsonFolderPath);
          console.log(`[${colorout.fg.green}${newFolderName}/${i18nFolder}/${jsonFolderName}${colorout.reset}]`);
        }

        for(const key in data) {
          const keyFileName = key+'.json';
          const formattedKeyJsonFile = path.join(formattedJsonFolderPath, keyFileName);
          
          fs.writeFileSync(formattedKeyJsonFile, JSON.stringify(data[key]));
          console.log(`[${colorout.fg.green}${newFolderName}/${i18nFolder}/${jsonFolderName}/${keyFileName}${colorout.reset}]`);
        }
      }
    }
  }
})();