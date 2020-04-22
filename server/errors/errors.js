class DbError extends Error {
  constructor() {
    super();
    this.name = 'some err with db';
  }
}

class NotFound extends Error {
  constructor() {
    super();
    this.name = 'not found';
  }
}
