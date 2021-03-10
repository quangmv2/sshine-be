import { CreateQuestionInput, UpdateQuestionInput } from "../graphql";
import { Type, Transform } from 'class-transformer';
import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";
import { IsMongoId } from "class-validator";

export class CreateQuestionInputDTO extends CreateQuestionInput {

    // @IsMongoId()
    // public id_contest: string
}

export class UpdateQuestionInputDTO extends UpdateQuestionInput {

}