export function IsIndexCharacter(data: unknown): data is IIndexCharacter {
  if(!data || typeof data !== 'object') return false;
  return 'id' in data
    && 'name' in data
    && 'tag' in data
    && 'rarity' in data
    && 'path' in data
    && 'element' in data
    && 'max_sp' in data
    && 'ranks' in data
    && 'skills' in data
    && 'skill_trees' in data
    && 'icon' in data
    && 'preview' in data
    && 'portrait' in data;
}
export interface IIndexCharacter {
  id: string;
  name: string;
  tag: string;
  rarity: number;
  path: string;
  element: string;
  max_sp: number;
  ranks: string[];
  skills: string[];
  skill_trees: string[];
  icon: string;
  preview: string;
  portrait: string;
}

export function IsIndexLightCone(data: unknown): data is IIndexLightCone {
  if(!data || typeof data !== 'object') return false;
  return 'id' in data
    && 'name' in data
    && 'rarity' in data
    && 'path' in data
    && 'desc' in data
    && 'icon' in data
    && 'preview' in data
    && 'portrait' in data;
}
export interface IIndexLightCone {
  id: String;
  name: string;
  rarity: number;
  path: string;
  desc: string;
  icon: string;
  preview: string;
  portrait: string;
}