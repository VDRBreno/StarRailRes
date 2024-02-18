## What does this folder do?
Generate the `join_index_min` and `unique_index_min` folders, using JavaScript and NodeJS.

## Why generate new folders?
So that requests made to json files are lighter and easier to manipulate objects on a client.

## What is the folder `unique_index_min`?
Contains the same content as `index_min`, but the folder structure is different, with each object key in the file `[lang]/[file].json` being its own file, making the path to `[lang]/[folder ]/[id].json`.<br/><br/>

## What is the folder `join_index_min`?
Contains files that can have relationships in a single file

structure of `index_min`:
```
  [language]
    ├─ ...
    ├─ characters.json
    ├─ characters_ranks.json
    ├─ characters_promotions.json
    ├─ characters_skills.json
    └─ characters_skill_trees.json
```

structure of `join_index_min`:
```
  [language]
    ├─ ...
    └─ characters
       └─ [id].json
```

In `[id].json` there is all content related to the character in a single file.

The same occurs for light_cones.<br/><br/>