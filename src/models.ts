import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  filePath = __dirname + "/pelis.json";

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(this.filePath);
  }

  async getById(id: number): Promise<Peli | null> {
    const allPelis = await this.getAll();
    return allPelis.find(p => p.id === id) || null;
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const allPelis = await this.getAll();
    return allPelis.filter(peli => {
      let matches = true;
      if (options.title) {
        matches = matches && peli.title.toLowerCase().includes(options.title.toLowerCase());
      }
      if (options.tag) {
        matches = matches && peli.tags.includes(options.tag);
      }
      return matches;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) return false;

    const all = await this.getAll();
    all.push(peli);
    await jsonfile.writeFile(this.filePath, all);
    return true;
  }
}

export { PelisCollection, Peli };