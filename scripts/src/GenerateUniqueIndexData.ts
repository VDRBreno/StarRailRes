import fs from 'node:fs';
import path from 'node:path';

import colorout from './utils/colorout';

export default async function GenerateUniqueIndexData() {
  const rootPath = path.join(__dirname, '..', '..');

  const newFolderNameFormatter = (name: string) => 'unique_'+name;
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

    for(const jsonFile of jsonFiles) {
      const jsonFilePath = path.join(i18nFolderPath, jsonFile);
      const data = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf-8' }));

      const jsonFolderName = jsonFile.split('.')[0];
      const newJsonFolderPath = path.join(newI18nPath, jsonFolderName);
      if(!fs.existsSync(newJsonFolderPath)) {
        fs.mkdirSync(newJsonFolderPath);
        console.log(`${colorout.fg.green}[ FOLDER ]${colorout.reset} ${newFolderName}/${i18nFolder}/${jsonFile}`);
      }

      for(const key in data) {
        const keyFilename = key+'.json';
        const newKeyJsonFile = path.join(newJsonFolderPath, keyFilename);
        
        fs.writeFileSync(newKeyJsonFile, JSON.stringify(data[key]));
        console.log(`${colorout.fg.green}[ FILE ]${colorout.reset} ${newFolderName}/${i18nFolder}/${jsonFile}/${keyFilename}`);
      }
    }
  }
}