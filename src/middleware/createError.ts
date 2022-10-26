export class NotExistError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

// class NotExistError extends Error {
//   private status: number;
//   constructor(message: string) {
//     super(message);
//     this.name = "Not Exist Error";
//     // Error.captureStackTrace(this);
//     this.status = 404;
//   }
// }

// export { NotExistError };
