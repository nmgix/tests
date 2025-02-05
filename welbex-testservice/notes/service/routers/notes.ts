import express, { RequestHandler, Request, Response } from "express";
import { Note, UserNote } from "../helper/createDatabaseConnection";
import { auth, RequestWithUser, UserAttributes } from "../middleware/auth";
import { NoteAttributes } from "../models/Note";
import axios from "axios";

//  await Note.create({ userId: user.id, title: 'Title example', text: 'Text example' })
export const NotesRouter = express.Router();

type NoteRequest = Request<{ id?: string }, {}, { user: UserAttributes }>;

/**
 * Тип запроса записок
 * @param {UserAttributes} user - проиходит из промежуточного по.
 */
const getNotes: RequestHandler = async (req: RequestWithUser, res: Response) => {
  try {
    const { user } = req.body;

    await Note.findAll({ where: { userId: user.id! } }).then((notes) => {
      if (notes && notes.length > 0) {
        return res.status(200).send(notes);
      } else {
        return res.status(200).send("Notes not found");
      }
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

/**
 * Тип запроса записок
 * @param {string} id - айди необходимой записки.
 */
const getNote: RequestHandler = async (req: NoteRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Params not set");
    }

    await Note.findOne({
      where: {
        id: id,
      },
    }).then((note) => {
      if (note) {
        return res.status(200).send(note);
      } else {
        return res.status(200).send("Note not found");
      }
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

type NoteUpdateRequest = Request<{ id?: string }, {}, { user: UserAttributes; payload: Partial<NoteAttributes> }>;
/**
 * Тип запроса записок
 * @param {string} id - айди записки для изменение.
 * @param {UserAttributes} user - проиходит из промежуточного по.
 * @param {Partial<NoteAttributes>} payload - данны для редактирования записи.
 */
const updateNote: RequestHandler = async (req: NoteUpdateRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { payload } = req.body;

    if (!payload || !id) {
      return res.status(400).send("Params not set");
    }

    await Note.findOne({
      where: {
        id: id,
      },
    }).then(async (note) => {
      if (!note) {
        return res.status(200).send("Note not found");
      } else {
        const updatedUser = await note.update(payload);
        return res.status(200).send(updatedUser);
      }
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

type NoteCreateRequest = Request<{}, {}, { user: UserAttributes; payload: Partial<NoteAttributes> }>;
/**
 * Тип запроса записок
 * @param {UserAttributes} user - проиходит из промежуточного по.
 * @param {Partial<NoteAttributes>} payload - данны для создания записи.
 */
const createNote: RequestHandler = async (req: NoteCreateRequest, res: Response) => {
  try {
    const { user, payload } = req.body;

    if (!payload) {
      return res.status(400).send("Params not set");
    }

    await UserNote.findOne({
      where: {
        id: user.id!,
      },
    }).then(async (userNote) => {
      if (!userNote) {
        await axios
          .post(`http://localhost:${process.env.PORT ? process.env.PORT : 8082}/user/${user.id}`)
          .then((user) => {
            if (!user) {
              return res.status(400).send("User not created");
            }
          });
      }
    });

    await Note.create({ userId: user.id!, title: payload.title, text: payload.text }).then((note) => {
      if (!note) {
        return res.status(400).send("Note not created");
      } else {
        return res.status(200).send(note);
      }
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

/**
 * Тип запроса записок
 * @param {string} id - айди необходимой записки.
 */
const deleteNote: RequestHandler = async (req: NoteRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Params not set");
    }

    await Note.findOne({
      where: {
        id: id,
      },
    }).then(async (note) => {
      if (!note) {
        return res.status(400).send("Note not found");
      }
      await note.destroy();
      return res.status(200).send("Note deleted");
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

NotesRouter.get("/all", auth, getNotes); //notes read
NotesRouter.get("/:id", auth, getNote); //note read
NotesRouter.put("/:id", auth, updateNote); //note update
NotesRouter.post("/", auth, createNote); //note create
NotesRouter.delete("/:id", auth, deleteNote); //note delete
