import {
  Collection,
  EntityChanges,
  Filter,
  OptionalUnlessRequiredId
} from "../types.js";

export default abstract class Model<T> {
  readonly collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  private getIdFilter(id: string) {
    return { _id: id } as Filter<T>;
  }

  findOneById(id: string) {
    return this.collection.findOne(this.getIdFilter(id));
  }

  findAll(filter: Filter<T> = {}) {
    return this.collection.find(filter).toArray();
  }

  save(doc: OptionalUnlessRequiredId<T>) {
    return this.collection.insertOne(doc);
  }

  async update(id: string, { updates, removedProperties }: EntityChanges<T>) {
    const filter = this.getIdFilter(id);
    await this.collection.updateOne(filter, {
      $set: updates,
      $unset: removedProperties.reduce<Record<string, "">>(
        (acc, prop) => ((acc[prop] = ""), acc),
        {}
      )
    });
    return this.collection.findOne(filter);
  }

  delete(id: string) {
    return this.collection.deleteOne(this.getIdFilter(id));
  }
}
