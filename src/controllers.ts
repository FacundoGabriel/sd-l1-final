import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[] | Peli | null> {
    if (options?.id) {
      return await this.pelis.getById(options.id);
    }

    if (options?.search) {
      return await this.pelis.search(options.search);
    }

    return await this.pelis.getAll();
  }

  async getOne(options): Promise<Peli | null> {
    const result = await this.get(options);
    return Array.isArray(result) ? result[0] : result;
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.pelis.add(peli);
  }
}

export { PelisController };
