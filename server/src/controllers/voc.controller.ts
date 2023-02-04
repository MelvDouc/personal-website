import VocModel from "../models/voc.model.js";
import { Request as Req, Response as Res } from "express";
import { EntityChanges } from "../types.js";

class VocController<T> {
  readonly model: VocModel;

  constructor(model: VocModel) {
    this.model = model;
  }

  async getOne(req: Req, res: Res) {
    const entity = await this.model.findOneById(req.params.id);
    return res.json(entity);
  }

  async getAll(req: Req, res: Res) {
    const entities = await this.model.findAll();
    return res.json(entities);
  }

  async create(req: Req, res: Res) {
    const entity = req.body;
    const insertResult = await this.model.save(entity);
    return res.json(
      await this.model.findOneById(insertResult.insertedId)
    );
  }

  async update(req: Req, res: Res) {
    const entityChanges = req.body as EntityChanges<T>;
    const entity = this.model.update(req.params.id, entityChanges);
    return res.json(entity);
  }

  async delete(req: Req, res: Res) {
    const { deletedCount } = await this.model.delete(req.params.id);
    return res.json({ deletedCount });
  }
}

export const englishVocController = new VocController(new VocModel(VocModel.collections.ENGLISH));
export const germanVocController = new VocController(new VocModel(VocModel.collections.GERMAN));