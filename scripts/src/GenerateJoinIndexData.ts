import fs from 'node:fs';
import path from 'node:path';
import colorout from './utils/colorout';

import { IIndexCharacter, IsIndexCharacter, IsIndexLightCone } from './types/IndexCharacters';
import handleError from './utils/handleError';

(async () => {

  const rootPath = path.join(__dirname, '..', '..');

  const folders = ['index_min'];
  const newFolderNameFormatter = (name: string) => 'join_'+name;
  const authorizedFolders = [
    'characters',
    'light_cones'
  ];

  if(!fs.existsSync(path.join(rootPath, 'join_index_min')))
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
        if(!authorizedFolders.includes(jsonFolderName)) continue;
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

  for(const folder of ['join_index_min']) {
    const folderPath = path.join(rootPath, folder);
    const i18nFolders = fs.readdirSync(folderPath);

    for(const i18nFolder of i18nFolders) {
      const i18nFolderPath = path.join(folderPath, i18nFolder);
      const dataFolders = ['characters', 'light_cones'];

      for(const dataFolder of dataFolders) {
        const dataFolderPath = path.join(i18nFolderPath, dataFolder);
        const dataFiles = fs.readdirSync(dataFolderPath);

        try {
          for(const file of dataFiles) {

            const filePath = path.join(dataFolderPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
            const changeFolderRootName = (name: string) => name.split('join_index_min').join('unique_index_min');
            if(IsIndexCharacter(data)) { 
              const ranks: Object[] = [];           
              for(const rank of data.ranks) {
                const rankDataFilePath = changeFolderRootName(path.join(i18nFolderPath, 'character_ranks', rank+'.json'));
                const data = JSON.parse(fs.readFileSync(rankDataFilePath, { encoding: 'utf-8' }));
                ranks.push(data);
              }

              const skill_trees: Object[] = [];           
              for(const skill_tree of data.skill_trees) {
                const skill_treeDataFilePath = changeFolderRootName(path.join(i18nFolderPath, 'character_skill_trees', skill_tree+'.json'));
                const data = JSON.parse(fs.readFileSync(skill_treeDataFilePath, { encoding: 'utf-8' }));
                skill_trees.push(data);
              }

              const skills: Object[] = [];           
              for(const skill of data.skills) {
                const skillDataFilePath = changeFolderRootName(path.join(i18nFolderPath, 'character_skills', skill+'.json'));
                const data = JSON.parse(fs.readFileSync(skillDataFilePath, { encoding: 'utf-8' }));
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
              fs.writeFileSync(filePath, dataString);
              console.log(`[${colorout.fg.green}RELATIONS ${folder}/${i18nFolder}/${dataFolder}/${data.id}.json${colorout.reset}]`)

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
              fs.writeFileSync(filePath, dataString);
              console.log(`[${colorout.fg.green}RELATIONS ${folder}/${i18nFolder}/${dataFolder}/${data.id}.json${colorout.reset}]`)
            }

          }
        } catch(error) {
          handleError(error);
        }
      }
    }
  }

})();