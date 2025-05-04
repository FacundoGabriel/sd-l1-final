import minimist from 'minimist';
import { PelisController } from './controllers';

async function main() {
  const args = minimist(process.argv.slice(2));
  const ctrl = new PelisController();

  if (args._[0] === 'add') {
    const success = await ctrl.add({ id: args.id, title: args.title, tags: args.tags });
    console.log(success ? 'Se agregó la peli' : 'Error al agregar (id repetido)');
  } else if (args._[0] === 'get') {
    const pelis = await ctrl.get({ id: Number(args._[1]) });
    console.log(pelis);
  } else {

    const pelis = await ctrl.get({ search: { title: args.title, tag: args.tag } });
    console.log(pelis);
  }
}

main();