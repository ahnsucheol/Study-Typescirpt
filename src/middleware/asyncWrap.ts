// import { Request, Response } from "express";

// export const asyncWrap = (controller: Function) => {
//   return async (req: Request, res: Response) => {
//     console.log("여기도 안오는게 맞나요?1");
//     try {
//       console.log("여기도 안오는게 맞나요?2");

//       await controller(req, res);
//       console.log("여기도 안오는게 맞나요?4");
//     } catch (err: any) {
//       console.log("여기도 안오는게 맞나요?3");

//       console.log(err);
//       res.status(err.status).json(err.message);
//     }
//   };
// };

import { Request, Response } from "express";

export const errorHandler = (controller: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await controller(req, res);
    } catch (err) {
      console.log(err);
      console.log("ersdfsdfr");
      res.status(err.status ? err.status : 500).json({ message: err.message });
    }
  };
};
