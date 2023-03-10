import {
  Collection,
  EntityChanges,
  Filter,
  OptionalUnlessRequiredId
} from "../types.js";

export default abstract class Model<T> {
  private readonly getCollection: () => Collection<T>;

  constructor(getCollection: () => Collection<T>) {
    this.getCollection = getCollection;
  }

  public get collection() {
    return this.getCollection();
  }

  private getIdFilter(id: string) {
    return { _id: id } as Filter<T>;
  }

  public findOneById(id: string) {
    return this.collection.findOne(this.getIdFilter(id));
  }

  public findAll(filter: Filter<T> = {}) {
    return this.collection.find(filter).toArray();
  }

  public save(doc: OptionalUnlessRequiredId<T>) {
    return this.collection.insertOne(doc);
  }

  public async update(id: string, { updates, removedProperties }: EntityChanges<T>) {
    const filter = this.getIdFilter(id);
    await this.collection.updateOne(filter, {
      $set: updates,
      $unset: removedProperties.reduce((acc, prop) => {
        acc[prop] = "";
        return acc;
      }, {} as Record<keyof T, "">)
    });
    return this.collection.findOne(filter);
  }

  public delete(id: string) {
    return this.collection.deleteOne(this.getIdFilter(id));
  }

  public isObject(entity: unknown): entity is object {
    return typeof entity === "object"
      && entity !== null;
  }

  public abstract isValidEntity(entity: unknown): boolean;
}
