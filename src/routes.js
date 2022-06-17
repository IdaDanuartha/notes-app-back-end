const { 
  addNoteHandler, 
  getAllNoteHandler, 
  getNoteByIdHandler, 
  editNoteHandler,
  deleteNoteHandler 
} = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteHandler,
  },
];