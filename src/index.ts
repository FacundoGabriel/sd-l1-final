import minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const params = minimist(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0];

  if (comando === "add") {
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const resultado = await controller.add(newPeli);
    console.log(resultado);
  } else if (comando === "get") {
    const id = parseInt(params._[1]);
    const resultado = await controller.get({ id });
    console.log(resultado);
  } else if (comando === "search") {
    const searchParams = {
      title: params.title,
      tag: params.tag,
    };
    const resultado = await controller.get({ search: searchParams });
    console.log(resultado);
  } else {
    const resultado = await controller.get();
    console.log(resultado);
  }
}

main();