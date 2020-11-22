const { Model } = require('objection');
const fs = require('fs');

class FileModel extends Model {
  static get tableName () {
    return 'files';
  }

  static async addFile (fileData, creatorId) {
    const { originalname: original, mimetype: type, filename, size } = fileData;
    const file = await this.query().insert({
      original, mimetype: type, filename, size, created_by: creatorId, model_name: '111', model_id: 1,
    });
    return file.id;
  }

  static async updateFile (fileData, fileId) {
    const { originalname: original, mimetype, filename, size } = fileData;
    const file = await this.query().findById(fileId);
    if (file) {
      fs.unlinkSync(`${__dirname}/../../uploads/${file.filename}`);
      console.log('file deleted successfully');
      await this.query().updateAndFetchById(fileId, {
        original, mimetype, filename, size,
      });
    }
  }

  static async removeFile (id) {
    const file = await this.query().findById(id);
    if (file) {
      await this.query().deleteById(id);
      fs.unlinkSync(`${__dirname}/../../uploads/${file.filename}`);
      console.log('file deleted successfully');
    }
  }
}

module.exports = FileModel;
