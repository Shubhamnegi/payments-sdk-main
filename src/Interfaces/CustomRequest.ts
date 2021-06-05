import { Request } from "express";
import * as  Bunyan from 'bunyan'

export interface CustomRequest extends Request {
    log: Bunyan
}