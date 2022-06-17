const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes 
  }
})

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params

  const note = notes.filter((n) => n.id === id)[0]

  if(note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404);
  return response;
}

const editNoteHandler = (req, h) => {
  const { id } = req.params

  const { title, tags, body } = req.payload

  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((n) => n.id === id)

  if(index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbaharui. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteNoteHandler = (req, h) => {
  const { id } = req.params

  const index = notes.findIndex((n) => n.id === id)

  if(index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addNoteHandler, getAllNoteHandler, getNoteByIdHandler, editNoteHandler, deleteNoteHandler };