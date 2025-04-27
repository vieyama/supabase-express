import { Request, Response, NextFunction } from 'express';

export const asyncHandler = <Req = Request, Res = Response>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as unknown as Req, res as unknown as Res, next)).catch(next);
  };
};