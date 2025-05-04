import { PelisCollection, Peli } from './models';

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }
    if (options.id !== undefined) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    return this.model.search(options.search!);
  }

  
  getOne(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli | undefined> {
    return this.get(options).then(res => res[0]);
  }

 
  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };