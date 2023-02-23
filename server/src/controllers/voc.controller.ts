import VocModel from "../models/voc.model.js";
import { Request as Req, Response as Res } from "express";
import { EntityChanges, Word } from "../types.js";

class VocController<T extends Word> {
  private readonly model: VocModel;

  constructor(model: VocModel) {
    this.model = model;
  }

  public async getOne(req: Req, res: Res) {
    const entity = await this.model.findOneById(req.params.id);
    res.json(entity);
  }

  public async getAll(req: Req, res: Res) {
    const entities = await this.model.findAll();
    res.json(entities);
  }

  public async create(req: Req, res: Res) {
    const entity = req.body;

    if (!this.model.isValidEntity(entity))
      return res.json({ error: "Invalid entity" });

    const insertResult = await this.model.save(entity);
    res.json(await this.model.findOneById(insertResult.insertedId));
  }

  public async update(req: Req, res: Res) {
    const entityChanges = req.body as EntityChanges<T>;
    // @ts-ignore
    const entity = await this.model.update(req.params.id, entityChanges);
    res.json(entity);
  }

  public async delete(req: Req, res: Res) {
    const { deletedCount } = await this.model.delete(req.params.id);
    res.json({ deletedCount });
  }
}

export const englishVocController = new VocController(
  new VocModel(VocModel.collections.ENGLISH)
);
export const germanVocController = new VocController(
  new VocModel(VocModel.collections.GERMAN)
);
