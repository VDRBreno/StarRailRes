import colorout from './colorout';

export default function handleError(error: any) {
  console.log('');
  console.error(`[${colorout.fg.red}ERROR${colorout.reset}]`);
  console.error(error);
  console.log('');
}