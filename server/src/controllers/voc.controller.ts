import VocModel from "../models/voc.model.js";
import { EntityChanges, Handler, Word } from "../types.js";

class VocController<T extends Word> {
  private readonly model: VocModel;

  constructor(model: VocModel) {
    this.model = model;
  }

  public getOne: Handler = async (req, res) => {
    const entity = await this.model.findOneById(req.params.id);
    res.json(entity);
  };

  public getAll: Handler = async (req, res) => {
    const entities = await this.model.findAll();
    res.json(entities);
  };

  public create: Handler = async (req, res) => {
    const entity = req.body;

    if (!this.model.isValidEntity(entity))
      return res.json({ error: "Invalid entity" });

    const insertResult = await this.model.save(entity);
    res.json(await this.model.findOneById(insertResult.insertedId));
  };

  public update: Handler = async (req, res) => {
    const entityChanges = req.body as EntityChanges<T>;
    // @ts-ignore
    const entity = await this.model.update(req.params.id, entityChanges);
    res.json(entity);
  };

  public delete: Handler = async (req, res) => {
    const { deletedCount } = await this.model.delete(req.params.id);
    res.json({ deletedCount });
  };
}

export const englishVocController = new VocController(
  new VocModel(VocModel.collections.ENGLISH)
);
export const germanVocController = new VocController(
  new VocModel(VocModel.collections.GERMAN)
);
