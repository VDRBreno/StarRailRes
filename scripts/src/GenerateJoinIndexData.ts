import fs from 'node:fs';
import path from 'node:path';
import colorout from './utils/colorout';

import { IsIndexCharacter, IsIndexLightCone } from './types/IndexCharacters';
import handleError from './utils/handleError';

(async () => {
  try {
    const rootPath = path.join(__dirname, '..', '..');

    const newFolderNameFormatter = (name: string) => 'join_'+name;
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
      const newI18nFolderPath = path.join(newFolderPath, i18nFolder);
      if(!fs.existsSync(newI18nFolderPath)) {
        fs.mkdirSync(newI18nFolderPath);
        console.log(`${colorout.fg.green}[ FOLDER ]${colorout.reset} ${newFolderName}/${i18nFolder}`);
      }
      
      const jsonFiles = fs.readdirSync(i18nFolderPath);
      for(const jsonFile of jsonFiles) {
        const jsonFilePath = path.join(i18nFolderPath, jsonFile);
        const fileData = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf-8' }));

        const jsonFolderName = jsonFile.split('.')[0];
        if(!authorizedFolders.includes(jsonFolderName)) continue;
        const newJsonFolderPath = path.join(newI18nFolderPath, jsonFolderName);
        if(!fs.existsSync(newJsonFolderPath)) {
          fs.mkdirSync(newJsonFolderPath);
          console.log(`${colorout.fg.green}[ FOLDER ]${colorout.reset} ${newFolderName}/${i18nFolder}/${jsonFolderName}`);
        }

        for(const key in fileData) {
          const data = fileData[key];
          const keyFilename = key+'.json';
          const keyJsonFile = path.join(newJsonFolderPath, keyFilename);
          const changeFolderRootName = (name: string) => name.split('index_min').join('unique_index_min');
          if(IsIndexCharacter(data)) {
            
            const ranks: Object[] = [];
            for(const prop of data.ranks) {
              const filePath = changeFolderRootName(path.join(i18nFolderPath, 'character_ranks', prop+'.json'));
              const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
              ranks.push(data);
            }

            const skill_trees: Object[] = [];
            for(const prop of data.skill_trees) {
              const filePath = changeFolderRootName(path.join(i18nFolderPath, 'character_skill_trees', prop+'.json'));
              const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
              skill_trees.push(data);
            }

            const skills: Object[] = [];
            for(const prop of data.skills) {
              const filePath = changeFolderRootName(path.join(i18nFolderPath, 'character_skills', prop+'.json'));
              const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
              skills.push(data);
            }

            const promotionFilePath = changeFolderRootName(path.join(i18nFolderPath, 'character_promotions', data.id+'.json'));
            const promotions = JSON.parse(fs.readFileSync(promotionFilePath, { encoding: 'utf-8' }));

            const dataParsed = {
              ...data,
              ranks,
              skill_trees,
              skills,
              promotions
            }

            const dataString = JSON.stringify(dataParsed);
            fs.writeFileSync(keyJsonFile, dataString);
            console.log(`${colorout.fg.green}[ FILE ]${colorout.reset} ${newFolderName}/${i18nFolder}/${jsonFolderName}/${keyFilename}`);

          } else if(IsIndexLightCone(data)) {

            const rankFilePath = changeFolderRootName(path.join(i18nFolderPath, 'light_cone_ranks', data.id+'.json'));
            const ranks = JSON.parse(fs.readFileSync(rankFilePath, { encoding: 'utf-8' }));

            const promotionFilePath = changeFolderRootName(path.join(i18nFolderPath, 'light_cone_promotions', data.id+'.json'));
            const promotions = JSON.parse(fs.readFileSync(promotionFilePath, { encoding: 'utf-8' }));

            const dataParsed = {
              ...data,
              ranks,
              promotions
            }

            const dataString = JSON.stringify(dataParsed);
            fs.writeFileSync(keyJsonFile, dataString);
            console.log(`${colorout.fg.green}[ FILE ]${colorout.reset} ${newFolderName}/${i18nFolder}/${jsonFolderName}/${keyFilename}`);

          }
        }
      }
    }
  } catch(error) {
    handleError(error);
  }
})();